const https = require('https');
const fs = require('fs');

// API Configuration
const API_KEY = process.env.NVIDIA_API_KEY || (fs.existsSync('./key.txt') ? fs.readFileSync('./key.txt', 'utf8').trim() : '');
if (!API_KEY) {
  console.error('❌ ERROR: NVIDIA_API_KEY not found!');
  console.error('   Set environment variable: NVIDIA_API_KEY=your_key');
  console.error('   Or create key.txt file with your API key');
  process.exit(1);
}
const BASE_URL = 'integrate.api.nvidia.com';
const RATE_LIMIT_DELAY = 1400; // 1.4 seconds between requests (45 RPM)

// Load all 161 models from previous comprehensive test
const previousResults = require('./nvidia_proper_test_results.json');
const allModelsFromPreviousTest = previousResults.results.map(r => ({
  model: r.model,
  publisher: r.publisher,
  modelName: r.modelName,
  detectedType: r.detectedType,
  endpoint: r.endpoint
}));

console.log(`📊 Loaded ${allModelsFromPreviousTest.length} models from previous comprehensive test`);

// Simple 1x1 pixel red PNG for vision testing
const TEST_IMAGE_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==';

// Determine timeout based on model type and name
function getTimeout(model) {
  const name = model.model.toLowerCase();
  
  // Extra large models (>200B)
  if (name.includes('405b') || name.includes('480b') || name.includes('675b') || 
      name.includes('397b') || name.includes('253b') || name.includes('deepseek')) {
    return 120000; // 120s
  }
  
  // Large models (70B-200B)
  if (name.includes('70b') || name.includes('120b') || name.includes('122b') || name.includes('123b')) {
    return 90000; // 90s
  }
  
  // Small/fast models
  if (name.includes('1b') || name.includes('2b') || name.includes('3b') || 
      name.includes('4b') || name.includes('mini') || name.includes('nano')) {
    return 30000; // 30s
  }
  
  // Default
  return 60000; // 60s
}

// Generic HTTPS request with retry logic
function makeRequest(endpoint, body, timeout = 60000, retries = 2) {
  return new Promise((resolve, reject) => {
    const attemptRequest = (attemptsLeft) => {
      const data = JSON.stringify(body);
      const options = {
        hostname: BASE_URL,
        path: endpoint,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data)
        },
        timeout
      };

      const req = https.request(options, (res) => {
        let responseData = '';
        res.on('data', chunk => responseData += chunk);
        res.on('end', () => {
          // Handle rate limiting with retry
          if (res.statusCode === 429 && attemptsLeft > 0) {
            setTimeout(() => attemptRequest(attemptsLeft - 1), 5000);
            return;
          }

          resolve({
            statusCode: res.statusCode,
            data: responseData,
            success: res.statusCode === 200
          });
        });
      });

      req.on('error', (err) => {
        // Retry on connection errors
        if ((err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT') && attemptsLeft > 0) {
          setTimeout(() => attemptRequest(attemptsLeft - 1), 2000);
          return;
        }
        reject(err);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('TIMEOUT'));
      });

      req.write(data);
      req.end();
    };

    attemptRequest(retries);
  });
}

// Test chat model
async function testChat(model) {
  const timeout = getTimeout(model);
  const startTime = Date.now();
  
  try {
    const result = await makeRequest('/v1/chat/completions', {
      model: model.model,
      messages: [{ role: 'user', content: 'Say "OK"' }],
      max_tokens: 10,
      temperature: 0.2
    }, timeout);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

    if (result.success) {
      return { success: true, time: elapsed, statusCode: 200, timeout };
    } else {
      let errorMsg = 'Unknown error';
      try {
        const errorData = JSON.parse(result.data);
        errorMsg = errorData.detail || errorData.error?.message || result.data.substring(0, 100);
      } catch (e) {
        errorMsg = result.data.substring(0, 100);
      }
      return { success: false, time: elapsed, statusCode: result.statusCode, error: errorMsg, timeout };
    }
  } catch (err) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    return { success: false, time: elapsed, error: err.message || err.code || 'Unknown error', timeout };
  }
}

// Test embeddings model
async function testEmbeddings(model) {
  const timeout = getTimeout(model);
  const startTime = Date.now();
  
  try {
    const result = await makeRequest('/v1/embeddings', {
      model: model.model,
      input: 'test',
      input_type: 'query',
      encoding_format: 'float'
    }, timeout);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

    if (result.success) {
      return { success: true, time: elapsed, statusCode: 200, timeout };
    } else {
      let errorMsg = 'Unknown error';
      try {
        const errorData = JSON.parse(result.data);
        errorMsg = errorData.detail || errorData.error?.message || result.data.substring(0, 100);
      } catch (e) {
        errorMsg = result.data.substring(0, 100);
      }
      return { success: false, time: elapsed, statusCode: result.statusCode, error: errorMsg, timeout };
    }
  } catch (err) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    return { success: false, time: elapsed, error: err.message || err.code || 'Unknown error', timeout };
  }
}

// Test vision multimodal model (text + image)
async function testVisionMultimodal(model) {
  const timeout = getTimeout(model);
  const startTime = Date.now();
  
  try {
    const result = await makeRequest('/v1/chat/completions', {
      model: model.model,
      messages: [{
        role: 'user',
        content: [
          { type: 'text', text: 'What color?' },
          { type: 'image_url', image_url: { url: `data:image/png;base64,${TEST_IMAGE_BASE64}` } }
        ]
      }],
      max_tokens: 10,
      temperature: 0.2
    }, timeout);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

    if (result.success) {
      return { success: true, time: elapsed, statusCode: 200, timeout };
    } else {
      let errorMsg = 'Unknown error';
      try {
        const errorData = JSON.parse(result.data);
        errorMsg = errorData.detail || errorData.error?.message || result.data.substring(0, 100);
      } catch (e) {
        errorMsg = result.data.substring(0, 100);
      }
      return { success: false, time: elapsed, statusCode: result.statusCode, error: errorMsg, timeout };
    }
  } catch (err) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    return { success: false, time: elapsed, error: err.message || err.code || 'Unknown error', timeout };
  }
}

// Test vision image-only model (no text)
async function testVisionImageOnly(model) {
  const timeout = getTimeout(model);
  const startTime = Date.now();
  
  try {
    const result = await makeRequest('/v1/chat/completions', {
      model: model.model,
      messages: [{
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: `data:image/png;base64,${TEST_IMAGE_BASE64}` } }
        ]
      }],
      max_tokens: 100,
      temperature: 0.2
    }, timeout);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

    if (result.success) {
      return { success: true, time: elapsed, statusCode: 200, timeout };
    } else {
      let errorMsg = 'Unknown error';
      try {
        const errorData = JSON.parse(result.data);
        errorMsg = errorData.detail || errorData.error?.message || result.data.substring(0, 100);
      } catch (e) {
        errorMsg = result.data.substring(0, 100);
      }
      return { success: false, time: elapsed, statusCode: result.statusCode, error: errorMsg, timeout };
    }
  } catch (err) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    return { success: false, time: elapsed, error: err.message || err.code || 'Unknown error', timeout };
  }
}

// Test rerank model
async function testRerank(model) {
  const timeout = getTimeout(model);
  const startTime = Date.now();
  
  try {
    const result = await makeRequest('/v1/ranking', {
      model: model.model,
      query: { text: 'test query' },
      passages: [
        { text: 'passage 1' },
        { text: 'passage 2' }
      ]
    }, timeout);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

    if (result.success) {
      return { success: true, time: elapsed, statusCode: 200, timeout };
    } else {
      let errorMsg = 'Unknown error';
      try {
        const errorData = JSON.parse(result.data);
        errorMsg = errorData.detail || errorData.error?.message || result.data.substring(0, 100);
      } catch (e) {
        errorMsg = result.data.substring(0, 100);
      }
      return { success: false, time: elapsed, statusCode: result.statusCode, error: errorMsg, timeout };
    }
  } catch (err) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    return { success: false, time: elapsed, error: err.message || err.code || 'Unknown error', timeout };
  }
}

// Get test function based on model type
function getTestFunction(model) {
  switch (model.detectedType) {
    case 'chat':
      return testChat;
    case 'embed':
      return testEmbeddings;
    case 'vision-multimodal':
      return testVisionMultimodal;
    case 'vision-image-only':
      return testVisionImageOnly;
    case 'rerank':
      return testRerank;
    default:
      return testChat; // Default to chat
  }
}

// Delay function
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main test function
async function testAllModels() {
  console.log('🚀 Comprehensive NVIDIA NIM API Test\n');
  console.log('📊 Total Models to Test:', allModelsFromPreviousTest.length);
  console.log('⏱️  Rate Limit: 45 requests/minute (1.4s delay)');
  console.log('⏳ Estimated Time:', Math.ceil((allModelsFromPreviousTest.length * 1.4) / 60), 'minutes\n');

  const results = {
    testedAt: new Date().toISOString(),
    totalModels: allModelsFromPreviousTest.length,
    tested: 0,
    working: 0,
    failed: 0,
    byType: {},
    models: []
  };

  const startTime = Date.now();

  for (let i = 0; i < allModelsFromPreviousTest.length; i++) {
    const model = allModelsFromPreviousTest[i];
    const progress = `[${i + 1}/${allModelsFromPreviousTest.length}]`;
    const percent = ((i + 1) / allModelsFromPreviousTest.length * 100).toFixed(1);
    
    process.stdout.write(`${progress} (${percent}%) Testing ${model.model} [${model.detectedType}]... `);

    const testFn = getTestFunction(model);
    const result = await testFn(model);
    
    results.tested++;

    const modelResult = {
      model: model.model,
      publisher: model.publisher,
      modelName: model.modelName,
      type: model.detectedType,
      endpoint: model.endpoint,
      ...result
    };

    if (result.success) {
      results.working++;
      console.log(`✅ OK (${result.time}s, timeout=${result.timeout/1000}s)`);
    } else {
      results.failed++;
      const errorShort = (result.error || 'Unknown').substring(0, 60);
      const statusInfo = result.statusCode ? `[${result.statusCode}]` : '';
      console.log(`❌ FAILED (${result.time}s) ${statusInfo} ${errorShort}`);
    }

    // Track by type
    if (!results.byType[model.detectedType]) {
      results.byType[model.detectedType] = { total: 0, working: 0, failed: 0 };
    }
    results.byType[model.detectedType].total++;
    if (result.success) {
      results.byType[model.detectedType].working++;
    } else {
      results.byType[model.detectedType].failed++;
    }

    results.models.push(modelResult);

    // Rate limiting delay (except for last model)
    if (i < allModelsFromPreviousTest.length - 1) {
      await delay(RATE_LIMIT_DELAY);
    }

    // Progress checkpoint every 25 models
    if ((i + 1) % 25 === 0) {
      const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
      const remaining = allModelsFromPreviousTest.length - (i + 1);
      const etaMinutes = (remaining * 1.4 / 60).toFixed(1);
      console.log(`\n⏱️  Progress: ${i + 1}/${allModelsFromPreviousTest.length} | Elapsed: ${elapsed}m | ETA: ${etaMinutes}m | Working: ${results.working}/${results.tested}\n`);
    }
  }

  const totalTime = ((Date.now() - startTime) / 1000 / 60).toFixed(1);

  // Final summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 FINAL COMPREHENSIVE RESULTS');
  console.log('='.repeat(70));
  console.log(`✅ Working: ${results.working}/${results.tested} (${((results.working/results.tested)*100).toFixed(1)}%)`);
  console.log(`❌ Failed: ${results.failed}/${results.tested} (${((results.failed/results.tested)*100).toFixed(1)}%)`);
  console.log(`⏱️  Total Time: ${totalTime} minutes`);

  // By type breakdown
  console.log('\n📦 Results by Model Type:');
  console.log('─'.repeat(70));
  for (const [type, stats] of Object.entries(results.byType)) {
    const rate = ((stats.working / stats.total) * 100).toFixed(1);
    console.log(`   ${type.padEnd(25)} ${stats.working}/${stats.total} working (${rate}%)`);
  }

  // Working models by type
  console.log('\n✅ Working Models by Type:');
  console.log('─'.repeat(70));
  for (const [type, stats] of Object.entries(results.byType)) {
    const workingModels = results.models.filter(m => m.type === type && m.success);
    if (workingModels.length > 0) {
      console.log(`\n${type.toUpperCase()} (${workingModels.length}):`);
      workingModels.forEach(m => {
        console.log(`   ✓ ${m.model} (${m.time}s)`);
      });
    }
  }

  // Save results
  const filename = 'comprehensive_test_results_complete.json';
  fs.writeFileSync(filename, JSON.stringify(results, null, 2));
  console.log(`\n💾 Full results saved to: ${filename}`);

  // Save working models only
  const workingModels = results.models.filter(m => m.success);
  fs.writeFileSync('all_working_models_verified.json', JSON.stringify(workingModels, null, 2));
  console.log(`💾 Working models saved to: all_working_models_verified.json`);

  // Save simple list
  const simpleList = workingModels.map(m => m.model).sort();
  fs.writeFileSync('working_models_list.txt', simpleList.join('\n'));
  console.log(`💾 Simple list saved to: working_models_list.txt`);

  console.log('\n✅ Comprehensive testing complete!\n');
}

// Run tests
testAllModels().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
