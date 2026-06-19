#!/usr/bin/env node
/**
 * Daily NVIDIA NIM API Testing & Documentation Update
 * Runs comprehensive tests and generates clean documentation
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const REPO_DIR = __dirname;
const KEEP_FILES = [
  // Scripts
  'test_all_comprehensive.js',
  'daily_update.js',
  'setup_daily_task.ps1',
  'package.json',
  'package-lock.json',
  '.gitignore',
  
  // Essential docs (will be regenerated)
  'NVIDIA_NIM_ULTIMATE_ALL_IN_ONE.md',
  'README.md',
  'USAGE_GUIDE.md',
  'WORKING_MODELS.md',
  'AUTOMATION_GUIDE.md',
  'QUICK_SETUP.md',
  'START_HERE.txt',
  'REPO_STRUCTURE.md',
  
  // Data files (will be regenerated)
  'comprehensive_test_results_complete.json',
  'all_working_models_verified.json',
  'working_models_list.txt'
];

console.log('\n╔══════════════════════════════════════════════════════╗');
console.log('║  🔄 NVIDIA NIM Daily Update Starting...            ║');
console.log('╚══════════════════════════════════════════════════════╝\n');

const startTime = Date.now();

// Step 1: Clean up old files
console.log('📁 Step 1: Cleaning up old files...');
cleanupOldFiles();

// Step 2: Run comprehensive tests
console.log('\n🧪 Step 2: Running comprehensive API tests...');
runTests();

// Step 3: Generate documentation
console.log('\n📝 Step 3: Generating comprehensive guide...');
generateDocumentation();

// Step 4: Final cleanup
console.log('\n🧹 Step 4: Final cleanup...');
finalCleanup();

const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
console.log('\n╔══════════════════════════════════════════════════════╗');
console.log(`║  ✅ Daily Update Complete! (${duration} minutes)          ║`);
console.log('╚══════════════════════════════════════════════════════╝\n');

// Functions

function cleanupOldFiles() {
  const files = fs.readdirSync(REPO_DIR);
  let deletedCount = 0;
  
  files.forEach(file => {
    const filePath = path.join(REPO_DIR, file);
    const stat = fs.statSync(filePath);
    
    // Skip directories
    if (stat.isDirectory()) return;
    
    // Skip keep files
    if (KEEP_FILES.includes(file)) {
      console.log(`  ✓ Keeping: ${file}`);
      return;
    }
    
    // Delete old data files (will be regenerated)
    if (file.endsWith('.json') && 
        !KEEP_FILES.includes(file)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`  🗑️  Deleted: ${file}`);
        deletedCount++;
      } catch (err) {
        console.log(`  ⚠️  Failed to delete: ${file}`);
      }
    }
    
    // Delete old markdown files (except keep list)
    if (file.endsWith('.md') && 
        !KEEP_FILES.includes(file)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`  🗑️  Deleted: ${file}`);
        deletedCount++;
      } catch (err) {
        console.log(`  ⚠️  Failed to delete: ${file}`);
      }
    }
  });
  
  console.log(`\n  📊 Cleaned up ${deletedCount} old files`);
}

function runTests() {
  try {
    console.log('  Running test_all_comprehensive.js...');
    execSync('node test_all_comprehensive.js', {
      cwd: REPO_DIR,
      stdio: 'inherit'
    });
    console.log('  ✅ Tests completed successfully!');
  } catch (error) {
    console.error('  ❌ Tests failed:', error.message);
    process.exit(1);
  }
}

function generateDocumentation() {
  // The comprehensive test already generates the documentation
  // Just verify it exists
  const docFile = path.join(REPO_DIR, 'NVIDIA_NIM_ULTIMATE_ALL_IN_ONE.md');
  if (fs.existsSync(docFile)) {
    const stats = fs.statSync(docFile);
    const sizeKB = (stats.size / 1024).toFixed(1);
    console.log(`  ✅ Documentation generated: ${sizeKB} KB`);
  } else {
    console.error('  ❌ Documentation not found!');
    process.exit(1);
  }
}

function finalCleanup() {
  // List what we're keeping
  console.log('  📋 Repository contains:');
  console.log('     📘 NVIDIA_NIM_ULTIMATE_ALL_IN_ONE.md');
  console.log('     📄 README.md');
  console.log('     📊 Test results (JSON)');
  console.log('     🔧 Test scripts');
  console.log('  ✅ Repository is clean and organized!');
}
