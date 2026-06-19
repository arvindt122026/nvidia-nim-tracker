# Complete List of Working NVIDIA NIM Models

> Tested with API key: `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`
> API Base URL: `https://integrate.api.nvidia.com`
> Rate Limit: 45 requests/minute | Timeout: 120 seconds

This list contains all models verified to work via the NVIDIA NIM free API tier.

**Total: 76 verified working models**

---

## How to Use

### Chat / Text Generation

```bash
curl https://integrate.api.nvidia.com/v1/chat/completions \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta/llama-3.1-8b-instruct",
    "messages": [{"role": "user", "content": "Hello!"}],
    "max_tokens": 500
  }'
```

### Vision (Base64 Image Required)

```bash
curl https://integrate.api.nvidia.com/v1/chat/completions \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta/llama-3.2-11b-vision-instruct",
    "messages": [{
      "role": "user",
      "content": [
        {"type": "text", "text": "Describe this image."},
        {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64,/9j/4AAQ..."}}
      ]
    }],
    "max_tokens": 500
  }'
```

### Embeddings (`input_type` Required)

```bash
curl https://integrate.api.nvidia.com/v1/embeddings \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nvidia/nv-embed-v1",
    "input": "Hello world",
    "input_type": "query"
  }'
```

---

## By Category

### Chat/Text Generation (49 models)

| Model ID | Publisher | Notes |
|---|---|---|
| meta/llama-3.1-405b-instruct | Meta | Long context, higher timeout |
| meta/llama-3.1-70b-instruct | Meta | |
| meta/llama-3.1-8b-instruct | Meta | |
| meta/llama-3.2-1b-instruct | Meta | |
| meta/llama-3.2-3b-instruct | Meta | |
| meta/llama-3.2-11b-vision-instruct | Meta | Vision-capable |
| meta/llama-3.2-90b-vision-instruct | Meta | Vision-capable |
| meta/llama-3.3-70b-instruct | Meta | |
| meta/llama-4-maverick-17b-128e-instruct | Meta | |
| meta/llama-guard-4-12b | Meta | Safety |
| mistralai/mistral-small-4-119b-2603 | Mistral AI | |
| mistralai/devstral-2-123b-instruct-2512 | Mistral AI | |
| mistralai/mistral-large-3-675b-instruct-2512 | Mistral AI | Recommended |
| mistralai/ministral-14b-instruct-2512 | Mistral AI | |
| mistralai/mistral-nemotron | Mistral AI | |
| mistralai/mistral-medium-3-instruct | Mistral AI | |
| mistralai/magistral-small-2506 | Mistral AI | |
| mistralai/mixtral-8x22b-instruct-v0.1 | Mistral AI | |
| mistralai/mixtral-8x7b-instruct-v0.1 | Mistral AI | |
| qwen/qwen3.5-122b-a10b | Qwen | |
| qwen/qwen3.5-397b-a17b | Qwen | Long context |
| qwen/qwen3-coder-480b-a35b-instruct | Qwen | Higher timeout |
| qwen/qwen2.5-coder-32b-instruct | Qwen | |
| qwen/qwen3-next-80b-a3b-instruct | Qwen | |
| qwen/qwen3-next-80b-a3b-thinking | Qwen | Reasoning |
| moonshotai/kimi-k2.5 | Moonshot AI | Recommended |
| moonshotai/kimi-k2-thinking | Moonshot AI | Reasoning |
| moonshotai/kimi-k2-instruct | Moonshot AI | |
| moonshotai/kimi-k2-instruct-0905 | Moonshot AI | |
| minimaxai/minimax-m2.5 | MiniMaxAI | Fast |
| minimaxai/minimax-m2.7 | MiniMaxAI | Recommended |
| google/gemma-3-27b-it | Google | Long context |
| google/gemma-3n-e2b-it | Google | Vision-capable |
| google/gemma-3n-e4b-it | Google | Vision-capable |
| google/gemma-2-2b-it | Google | Fast |
| google/gemma-4-31b-it | Google | Fast |
| deepseek-ai/deepseek-v3.2 | DeepSeek AI | Reasoning |
| deepseek-ai/deepseek-v3.1-terminus | DeepSeek AI | |
| stepfun-ai/step-3.5-flash | StepFun AI | |
| z-ai/glm-5.1 | Z-AI | |
| stockmark/stockmark-2-100b-instruct | Stockmark | |
| bytedance/seed-oss-36b-instruct | ByteDance | |
| sarvamai/sarvam-m | Sarvamai | |
| abacusai/dracarys-llama-3.1-70b-instruct | AbacusAI | |
| upstage/solar-10.7b-instruct | Upstage | |
| openai/gpt-oss-20b | OpenAI | |
| openai/gpt-oss-120b | OpenAI | Higher timeout |
| microsoft/phi-4-mini-instruct | Microsoft | Fast |
| microsoft/phi-4-multimodal-instruct | Microsoft | Vision-capable |

---

### Safety & Guardrails (6 models)

| Model ID | Publisher |
|---|---|
| nvidia/nemotron-3-content-safety | NVIDIA |
| nvidia/nemotron-content-safety-reasoning-4b | NVIDIA |
| nvidia/llama-3.1-nemotron-safety-guard-8b-v3 | NVIDIA |
| nvidia/llama-3.1-nemoguard-8b-content-safety | NVIDIA |
| nvidia/llama-3.1-nemoguard-8b-topic-control | NVIDIA |
| nvidia/gliner-pii | NVIDIA |

---

### NVIDIA Nemotron Series (10 models)

| Model ID | Publisher | Notes |
|---|---|---|
| nvidia/nemotron-3-super-120b-a12b | NVIDIA | Higher timeout |
| nvidia/nemotron-3-nano-30b-a3b | NVIDIA | |
| nvidia/nemotron-nano-12b-v2-vl | NVIDIA | Vision-capable |
| nvidia/llama-3.1-nemotron-nano-vl-8b-v1 | NVIDIA | Vision-capable |
| nvidia/llama-3.1-nemotron-nano-8b-v1 | NVIDIA | |
| nvidia/llama-3.1-nemotron-ultra-253b-v1 | NVIDIA | Higher timeout |
| nvidia/llama-3.3-nemotron-super-49b-v1 | NVIDIA | |
| nvidia/llama-3.3-nemotron-super-49b-v1.5 | NVIDIA | |
| nvidia/nemotron-mini-4b-instruct | NVIDIA | Fast |
| nvidia/nvidia-nemotron-nano-9b-v2 | NVIDIA | |

---

### Embeddings (7 models)

| Model ID | Publisher | Notes |
|---|---|---|
| nvidia/nv-embed-v1 | NVIDIA | Recommended |
| nvidia/llama-nemotron-embed-1b-v2 | NVIDIA | Requires `input_type` |
| nvidia/llama-nemotron-embed-vl-1b-v2 | NVIDIA | Requires `input_type` |
| nvidia/nv-embedcode-7b-v1 | NVIDIA | Requires `input_type` |
| nvidia/llama-3.2-nv-embedqa-1b-v2 | NVIDIA | Requires `input_type` |
| nvidia/nv-embedqa-e5-v5 | NVIDIA | Requires `input_type` |
| baai/bge-m3 | BAAI | |

---

### Vision Models (2 models)

> These models require **base64 image input only** (no text).

| Model ID | Publisher |
|---|---|
| nvidia/nemotron-parse | NVIDIA |
| nvidia/nemoretriever-parse | NVIDIA |

---

### Specialized (2 models)

| Model ID | Publisher | Notes |
|---|---|---|
| nvidia/ising-calibration-1-35b-a3b | NVIDIA | Higher timeout |
| nvidia/riva-translate-4b-instruct-v1.1 | NVIDIA | |

---

## Summary by Publisher

| Publisher | Count |
|---|---|
| Meta | 10 |
| Mistral AI | 9 |
| Qwen | 6 |
| NVIDIA | 26 |
| Moonshot AI | 4 |
| MiniMaxAI | 2 |
| Google | 5 |
| DeepSeek AI | 2 |
| OpenAI | 2 |
| ByteDance | 1 |
| StepFun AI | 1 |
| Z-AI | 1 |
| AbacusAI | 1 |
| Sarvamai | 1 |
| Stockmark | 1 |
| Upstage | 1 |
| Microsoft | 2 |
| BAAI | 1 |

---

## Recommended Model Stack

| Layer | Primary | Backup 1 | Backup 2 |
|---|---|---|---|
| General | `mistralai/mistral-large-3-675b-instruct-2512` | `minimaxai/minimax-m2.7` | `moonshotai/kimi-k2.5` |
| Reasoning | `qwen/qwen3-next-80b-a3b-thinking` | `moonshotai/kimi-k2-thinking` | `deepseek-ai/deepseek-v3.2` |
| Fast | `google/gemma-4-31b-it` | `minimaxai/minimax-m2.5` | `microsoft/phi-4-mini-instruct` |
| Retrieval | `nvidia/nv-embed-v1` | `baai/bge-m3` | — |
| Long-context | `meta/llama-3.1-405b-instruct` | `google/gemma-3-27b-it` | `qwen/qwen3.5-397b-a17b` |
| Vision | `meta/llama-3.2-11b-vision-instruct` | `google/gemma-3n-e2b-it` | `nvidia/nemotron-nano-12b-v2-vl` |

---

## Timeout Recommendations

| Model Size | Timeout | Examples |
|---|---|---|
| Small (< 15B) | 30s | `phi-4-mini`, `gemma-2-2b`, `nemotron-mini` |
| Medium (15B-70B) | 60s | Most models |
| Large (70B-200B) | 90s | `llama-3.3-70b`, `qwen3.5-122b` |
| Extra Large (> 200B) | 120s | `llama-3.1-405b`, `deepseek-v3.2`, `qwen3-coder-480b` |
| Specialized | 60-120s | `ising-calibration`, safety models |

---

## Models NOT Accessible (via Free API)

These models exist on the web UI but cannot be called via the free `integrate.api.nvidia.com` endpoints.

| Category | Why It Fails | Solution |
|---|---|---|
| **Image Generation** (FLUX, Stable Diffusion) | `/v1/images/generations` returns 404 | Separate Visual GenAI service or local Docker |
| **Audio / Speech** (Whisper, TTS, ASR) | `/v1/audio/*` endpoints don't exist | Downloadable-only or separate Riva service |
| **Reranking** | `/v1/rerank` endpoint doesn't exist | Downloadable-only |
| **Bio / 3D / Chemistry** (AlphaFold, ESM, etc.) | 404 on all endpoints | Domain-specific APIs or downloadable-only |
| **Translation** (Riva, Megatron NMT) | 404 on chat endpoint | Separate Riva service |
| **Cosmos** (video world models) | 404 on all endpoints | Domain-specific APIs |
| **Deprecated** | Returns HTTP 410 Gone | `mistral-7b-instruct-v0.2`, `paligemma`, `phi-3-mini-*`, `streampetr` |
| **Downloadable-only** | Not hosted on API | Must run locally via Docker |

### Common Errors

| Error Code | Meaning | Fix |
|---|---|---|
| **HTTP 404** | Model/endpoint not found | Wrong endpoint or model not available on free tier |
| **HTTP 410** | Model deprecated | Model has reached end-of-life |
| **HTTP 400** | Bad request (missing params) | Add `input_type` for embeddings, use base64 for images |
| **HTTP 500** | Server error | Often caused by public image URLs — use base64 |
| **ECONNRESET** | Network issue | Retry the request |
| **Timeout** | Model too slow | Reduce `max_tokens` or retry |

---

*Last updated: April 22, 2026*
*Tested via: `https://integrate.api.nvidia.com/v1/chat/completions` and `/v1/embeddings`*