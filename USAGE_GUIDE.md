# Complete Usage Guide for All Working NVIDIA NIM Models

**API Base URL:** `https://integrate.api.nvidia.com`

**Rate Limits:** 45 requests per minute, 120 second timeout

---

## 1. Chat / Text Generation (68 models)

All 68 chat models use the same syntax.

### Endpoint
```
POST /v1/chat/completions
```

### Headers
```
Authorization: Bearer <API_KEY>
Content-Type: application/json
```

### Request Body
```json
{
  "model": "meta/llama-3.1-8b-instruct",
  "messages": [
    {"role": "user", "content": "Your prompt here"}
  ],
  "max_tokens": 1024,
  "temperature": 0.7,
  "top_p": 0.9
}
```

### Example (cURL)
```bash
curl https://integrate.api.nvidia.com/v1/chat/completions \
  -H "Authorization: Bearer nvapi-xxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta/llama-3.1-8b-instruct",
    "messages": [{"role": "user", "content": "Explain quantum computing"}],
    "max_tokens": 500
  }'
```

### Example (Python)
```python
import requests

response = requests.post(
    "https://integrate.api.nvidia.com/v1/chat/completions",
    headers={"Authorization": "Bearer nvapi-xxxxxxxx"},
    json={
        "model": "meta/llama-3.1-8b-instruct",
        "messages": [{"role": "user", "content": "Hello!"}],
        "max_tokens": 100
    }
)
print(response.json()["choices"][0]["message"]["content"])
```

### Example (Node.js)
```javascript
const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer nvapi-xxxxxxxx',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'meta/llama-3.1-8b-instruct',
    messages: [{ role: 'user', content: 'Hello!' }],
    max_tokens: 100
  })
});
const data = await response.json();
console.log(data.choices[0].message.content);
```

### All Chat Models (same syntax)

<details>
<summary><b>Click to expand all 68 chat models</b></summary>

**Meta (9 models):**
- `meta/llama-3.1-405b-instruct`
- `meta/llama-3.1-70b-instruct` ⭐ added
- `meta/llama-3.1-8b-instruct`
- `meta/llama-3.2-1b-instruct`
- `meta/llama-3.2-3b-instruct`
- `meta/llama-3.2-11b-vision-instruct` (vision-capable)
- `meta/llama-3.2-90b-vision-instruct` (vision-capable)
- `meta/llama-3.3-70b-instruct`
- `meta/llama-4-maverick-17b-128e-instruct`
- `meta/llama-guard-4-12b` (safety)

**Mistral AI (9 models):**
- `mistralai/mistral-small-4-119b-2603`
- `mistralai/devstral-2-123b-instruct-2512`
- `mistralai/mistral-large-3-675b-instruct-2512` ⭐ recommended
- `mistralai/ministral-14b-instruct-2512`
- `mistralai/mistral-nemotron`
- `mistralai/mistral-medium-3-instruct`
- `mistralai/magistral-small-2506`
- `mistralai/mixtral-8x22b-instruct-v0.1`
- `mistralai/mixtral-8x7b-instruct-v0.1`

**NVIDIA Nemotron Series (10 models):**
- `nvidia/nemotron-3-super-120b-a12b` (slower, higher timeout recommended)
- `nvidia/nemotron-3-nano-30b-a3b`
- `nvidia/nemotron-nano-12b-v2-vl` (vision-capable)
- `nvidia/llama-3.1-nemotron-nano-vl-8b-v1` (vision-capable)
- `nvidia/llama-3.1-nemotron-nano-8b-v1`
- `nvidia/llama-3.1-nemotron-ultra-253b-v1` (slower, higher timeout recommended)
- `nvidia/llama-3.3-nemotron-super-49b-v1`
- `nvidia/llama-3.3-nemotron-super-49b-v1.5`
- `nvidia/nemotron-mini-4b-instruct`
- `nvidia/nvidia-nemotron-nano-9b-v2`

**Qwen (6 models):**
- `qwen/qwen3.5-122b-a10b`
- `qwen/qwen3.5-397b-a17b` ⭐ long context
- `qwen/qwen3-coder-480b-a35b-instruct`
- `qwen/qwen2.5-coder-32b-instruct`
- `qwen/qwen3-next-80b-a3b-instruct`
- `qwen/qwen3-next-80b-a3b-thinking` ⭐ reasoning

**Moonshot AI (4 models):**
- `moonshotai/kimi-k2.5` ⭐ recommended
- `moonshotai/kimi-k2-thinking` ⭐ reasoning
- `moonshotai/kimi-k2-instruct`
- `moonshotai/kimi-k2-instruct-0905`

**Google (5 models):**
- `google/gemma-3-27b-it`
- `google/gemma-3n-e2b-it` (vision-capable)
- `google/gemma-3n-e4b-it` (vision-capable)
- `google/gemma-2-2b-it` (fast)
- `google/gemma-4-31b-it` ⭐ fast

**DeepSeek AI (2 models):**
- `deepseek-ai/deepseek-v3.2` ⭐ reasoning
- `deepseek-ai/deepseek-v3.1-terminus`

**Others (12 models):**
- `minimaxai/minimax-m2.5` (fast)
- `minimaxai/minimax-m2.7` ⭐ recommended
- `microsoft/phi-4-mini-instruct` (fast)
- `microsoft/phi-4-multimodal-instruct` (vision-capable)
- `openai/gpt-oss-20b`
- `openai/gpt-oss-120b`
- `stepfun-ai/step-3.5-flash`
- `z-ai/glm-5.1`
- `stockmark/stockmark-2-100b-instruct`
- `bytedance/seed-oss-36b-instruct`
- `sarvamai/sarvam-m`
- `abacusai/dracarys-llama-3.1-70b-instruct`
- `upstage/solar-10.7b-instruct`

**Safety & Guardrails (6 models):**
- `nvidia/nemotron-3-content-safety`
- `nvidia/nemotron-content-safety-reasoning-4b`
- `nvidia/llama-3.1-nemotron-safety-guard-8b-v3`
- `nvidia/llama-3.1-nemoguard-8b-content-safety`
- `nvidia/llama-3.1-nemoguard-8b-topic-control`
- `nvidia/gliner-pii`

**Specialized (2 models):**
- `nvidia/ising-calibration-1-35b-a3b` (may need higher timeout)
- `nvidia/riva-translate-4b-instruct-v1.1`
</details>

---

## 2. Vision Models (10 models)

**⚠️ CRITICAL:** Vision models require **base64-encoded images**, NOT URLs.

### Endpoint
```
POST /v1/chat/completions
```

### Request Body (Image + Text)
```json
{
  "model": "meta/llama-3.2-11b-vision-instruct",
  "messages": [{
    "role": "user",
    "content": [
      {"type": "text", "text": "Describe this image."},
      {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64,/9j/4AAQ..."}}
    ]
  }],
  "max_tokens": 1000
}
```

### Request Body (Image Only - Parse Models)
```json
{
  "model": "nvidia/nemotron-parse",
  "messages": [{
    "role": "user",
    "content": [
      {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64,/9j/4AAQ..."}}
    ]
  }],
  "max_tokens": 1000
}
```

### Encode Image to Base64

**Linux/Mac:**
```bash
base64 -i image.jpg -o image.b64
data:image/jpeg;base64,$(cat image.b64)
```

**Windows (PowerShell):**
```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("image.jpg"))
# Prefix with: data:image/jpeg;base64,
```

**Python:**
```python
import base64

with open("image.jpg", "rb") as f:
    b64 = base64.b64encode(f.read()).decode()
    data_uri = f"data:image/jpeg;base64,{b64}"
```

### Example (cURL with Base64 Image)
```bash
# First, encode your image
IMAGE_B64=$(base64 -w 0 photo.jpg)

curl https://integrate.api.nvidia.com/v1/chat/completions \
  -H "Authorization: Bearer nvapi-xxxxxxxx" \
  -H "Content-Type: application/json" \
  -d "{
    \"model\": \"meta/llama-3.2-11b-vision-instruct\",
    \"messages\": [{
      \"role\": \"user\",
      \"content\": [
        {\"type\": \"text\", \"text\": \"What's in this image?\"},
        {\"type\": \"image_url\", \"image_url\": {\"url\": \"data:image/jpeg;base64,${IMAGE_B64}\"}}
      ]
    }],
    \"max_tokens\": 500
  }"
```

### Vision-Capable Models

| Model | Publisher | Input | Notes |
|-------|-----------|-------|-------|
| `meta/llama-3.2-11b-vision-instruct` | Meta | image + text | Fast vision model |
| `meta/llama-3.2-90b-vision-instruct` | Meta | image + text | Large vision model |
| `google/gemma-3n-e2b-it` | Google | image + text | Fast, efficient |
| `google/gemma-3n-e4b-it` | Google | image + text | Fast, efficient |
| `google/gemma-4-31b-it` | Google | image + text | Higher quality |
| `nvidia/nemotron-nano-12b-v2-vl` | NVIDIA | image + text | NVIDIA optimized |
| `nvidia/llama-3.1-nemotron-nano-vl-8b-v1` | NVIDIA | image + text | Small, fast |
| `microsoft/phi-4-multimodal-instruct` | Microsoft | image + text | Multimodal |
| `nvidia/nemotron-parse` | NVIDIA | **image only** ⭐ | Document parsing |
| `nvidia/nemoretriever-parse` | NVIDIA | **image only** ⭐ | OCR + structure |

---

## 3. Embeddings (7 models)

**⚠️ REQUIRED:** All embedding models need `input_type` parameter.

### Endpoint
```
POST /v1/embeddings
```

### Request Body
```json
{
  "model": "nvidia/nv-embed-v1",
  "input": "Text to embed",
  "input_type": "query",
  "encoding_format": "float"
}
```

### Example (cURL)
```bash
curl https://integrate.api.nvidia.com/v1/embeddings \
  -H "Authorization: Bearer nvapi-xxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nvidia/nv-embed-v1",
    "input": "How to make pizza",
    "input_type": "query"
  }'
```

### Example (Python)
```python
import requests

response = requests.post(
    "https://integrate.api.nvidia.com/v1/embeddings",
    headers={"Authorization": "Bearer nvapi-xxxxxxxx"},
    json={
        "model": "nvidia/nv-embed-v1",
        "input": "Text to embed",
        "input_type": "query"  # or "passage"
    }
)
embedding = response.json()["data"][0]["embedding"]
```

### All Embedding Models

| Model | Publisher | Input Type | Notes |
|-------|-----------|------------|-------|
| `nvidia/nv-embed-v1` | NVIDIA | `"query"` or `"passage"` | Best general purpose |
| `nvidia/llama-nemotron-embed-1b-v2` | NVIDIA | `"query"` or `"passage"` | Fast, small |
| `nvidia/llama-nemotron-embed-vl-1b-v2` | NVIDIA | `"query"` or `"passage"` | Vision + text |
| `nvidia/nv-embedcode-7b-v1` | NVIDIA | `"query"` or `"passage"` | Code embeddings |
| `nvidia/llama-3.2-nv-embedqa-1b-v2` | NVIDIA | `"query"` or `"passage"` | Q&A optimized |
| `nvidia/nv-embedqa-e5-v5` | NVIDIA | `"query"` or `"passage"` | Q&A optimized |
| `baai/bge-m3` | BAAI | `"query"` or `"passage"` | Multilingual |

### Usage: Query vs Passage

- **`"query"`** — Use when embedding a search query/question
- **`"passage"`** — Use when embedding documents/text to be searched

---

## 4. Complete Working Model Stack (Recommended)

### Tier 1: Production-Ready Stack

| Use Case | Primary Model | Syntax |
|----------|-------------|--------|
| **General Chat** | `mistralai/mistral-large-3-675b-instruct-2512` | Standard chat |
| **Reasoning/Thinking** | `qwen/qwen3-next-80b-a3b-thinking` | Standard chat |
| **Fast/Low Latency** | `google/gemma-4-31b-it` | Standard chat |
| **Long Context** | `meta/llama-3.1-405b-instruct` | Standard chat (increase timeout) |
| **Vision** | `meta/llama-3.2-11b-vision-instruct` | Vision syntax with base64 |
| **Embeddings** | `nvidia/nv-embed-v1` | Embeddings with `input_type` |
| **Safety Check** | `nvidia/llama-3.1-nemotron-safety-guard-8b-v3` | Standard chat |

### Tier 2: Backups

| If Primary Fails | Use This | Notes |
|------------------|----------|-------|
| `mistral-large-3` → | `minimaxai/minimax-m2.7` | Similar quality |
| `gemma-4-31b` → | `minimaxai/minimax-m2.5` | Even faster |
| `llama-3.1-405b` → | `qwen/qwen3.5-397b-a17b` | Similar context |
| `kimi-k2.5` → | `deepseek-v3.2` | Good reasoning backup |

---

## 5. Timeout Recommendations

| Model Size | Timeout | Notes |
|------------|---------|-------|
| Small (< 15B) | 30 seconds | `phi-4-mini`, `gemma-2-2b`, `nemotron-mini` |
| Medium (15B-70B) | 60 seconds | Most models fall here |
| Large (70B-200B) | 90 seconds | `llama-3.3-70b`, `qwen3.5-122b` |
| Extra Large (> 200B) | 120 seconds | `llama-3.1-405b`, `deepseek-v3.2`, `qwen3-coder-480b` |
| Specialized | 60-120 seconds | `ising-calibration`, safety models |

---

## 6. Complete Node.js Reference Implementation

```javascript
const https = require('https');

const API_KEY = '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';
const HOST = 'integrate.api.nvidia.com';

// Generic request function
function nvidiaRequest(path, payload, timeout = 60000) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const req = https.request({
      hostname: HOST,
      path,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      },
      timeout
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject({ status: res.statusCode, error: data });
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => reject(new Error('Timeout')));
    req.write(body);
    req.end();
  });
}

// Chat completion
async function chat(model, prompt, maxTokens = 500) {
  return nvidiaRequest('/v1/chat/completions', {
    model,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: maxTokens
  });
}

// Vision completion (base64 image)
async function vision(model, prompt, base64Image, maxTokens = 500) {
  return nvidiaRequest('/v1/chat/completions', {
    model,
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: prompt },
        { type: 'image_url', image_url: { url: base64Image } }
      ]
    }],
    max_tokens: maxTokens
  });
}

// Embeddings
async function embed(model, text, inputType = 'query') {
  return nvidiaRequest('/v1/embeddings', {
    model,
    input: text,
    input_type: inputType
  });
}

// Usage
(async () => {
  try {
    // Chat
    const chatResult = await chat('mistralai/mistral-large-3-675b-instruct-2512', 'Hello!');
    console.log('Chat:', chatResult.choices[0].message.content);
    
    // Embeddings
    const embedResult = await embed('nvidia/nv-embed-v1', 'Hello world', 'query');
    console.log('Embedding length:', embedResult.data[0].embedding.length);
  } catch (err) {
    console.error('Error:', err);
  }
})();
```

---

## 7. Error Handling

| Error | Meaning | Solution |
|-------|---------|----------|
| `400 Bad Request` | Invalid parameters | Check `input_type` for embeddings, use base64 for images |
| `404 Not Found` | Model not available | Model requires different endpoint or not on free tier |
| `410 Gone` | Model deprecated | Model reached end-of-life |
| `500 Server Error` | Server issue | Often caused by public image URLs — use base64 |
| `429 Too Many Requests` | Rate limit hit | Wait and retry (45 RPM limit) |
| `Timeout` | Request too slow | Increase timeout or reduce `max_tokens` |

---

*Last updated: April 22, 2026*
