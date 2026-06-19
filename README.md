# NVIDIA NIM API Testing & Documentation

[![Daily Testing](https://github.com/YOUR_USERNAME/nvidia-nim-api-testing/actions/workflows/daily-test.yml/badge.svg)](https://github.com/YOUR_USERNAME/nvidia-nim-api-testing/actions/workflows/daily-test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Automated daily testing of all NVIDIA NIM API models with comprehensive documentation.**

🔄 **Last Updated:** Auto-updated daily at 3:00 AM UTC  
📊 **Models Tested:** 161  
✅ **Currently Working:** 52 (32.3%)  

---

## 📘 Complete Documentation

**Everything you need in ONE file:** [NVIDIA_NIM_ULTIMATE_ALL_IN_ONE.md](NVIDIA_NIM_ULTIMATE_ALL_IN_ONE.md)

- All 52 working models with complete usage examples
- Full JavaScript, Python, and cURL code
- Actual performance data from daily testing
- 109 failed models analysis
- Best practices & troubleshooting

---

## 🚀 Quick Start

### Use the API

```javascript
const https = require('https');

const options = {
  hostname: 'integrate.api.nvidia.com',
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
};

const data = JSON.stringify({
  model: 'mistralai/mistral-small-4-119b-2603',
  messages: [{ role: 'user', content: 'Hello!' }],
  max_tokens: 100
});

const req = https.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.parse(body)));
});

req.write(data);
req.end();
```

**Get your API key:** https://build.nvidia.com/

---

## 🏆 Top Recommended Models

| Use Case | Model | Speed | Why |
|----------|-------|-------|-----|
| **Fastest** | `mistralai/mistral-small-4-119b-2603` | 0.16s | Instant responses |
| **Best Balance** | `meta/llama-3.3-70b-instruct` | 0.46s | 70B in <0.5s! |
| **Embeddings** | `nvidia/nv-embed-v1` | 7.68s | Best retrieval |
| **Vision** | `meta/llama-3.2-11b-vision-instruct` | 2.99s | Image understanding |
| **Safety** | `nvidia/llama-3.1-nemotron-safety-guard-8b-v3` | 0.35s | Content moderation |

*All timing data from actual automated testing*

---

## 🔄 Automated Daily Updates

This repository automatically:
- ✅ Tests all 161 NVIDIA NIM API models daily
- ✅ Updates documentation with latest results
- ✅ Tracks changes over time
- ✅ Generates downloadable reports

**See:** [Actions](https://github.com/YOUR_USERNAME/nvidia-nim-api-testing/actions) tab for latest runs

---

## 📊 What We Test

- **Chat Models:** 135 models (38 working)
- **Embeddings:** 10 models (6 working)
- **Vision Multimodal:** 7 models (6 working)
- **Vision OCR:** 4 models (2 working)
- **Safety Models:** 6 models (6 working)
- **Rerank Models:** 5 models (0 working - endpoint unavailable)

**Total:** 161 models tested → 52 working (32.3% success rate)

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| **[NVIDIA_NIM_ULTIMATE_ALL_IN_ONE.md](NVIDIA_NIM_ULTIMATE_ALL_IN_ONE.md)** | **⭐ Main comprehensive guide** |
| [GITHUB_SETUP.md](GITHUB_SETUP.md) | Set up your own automated testing |
| [AUTOMATION_GUIDE.md](AUTOMATION_GUIDE.md) | Complete automation documentation |
| [QUICK_SETUP.md](QUICK_SETUP.md) | 5-minute local setup |
| [USAGE_GUIDE.md](USAGE_GUIDE.md) | API usage patterns |
| [REPO_STRUCTURE.md](REPO_STRUCTURE.md) | Repository organization |

---

## 🔧 Run Locally

### Prerequisites
- Node.js 18+ installed
- NVIDIA API key from https://build.nvidia.com/

### Setup

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/nvidia-nim-api-testing.git
cd nvidia-nim-api-testing

# Install dependencies
npm install

# Set API key (Option 1: Environment variable)
export NVIDIA_API_KEY="your_api_key_here"

# Or Option 2: Create key.txt file
echo "your_api_key_here" > key.txt

# Run tests
node test_all_comprehensive.js
```

**Results will be in:**
- `comprehensive_test_results_complete.json`
- `NVIDIA_NIM_ULTIMATE_ALL_IN_ONE.md`
- `all_working_models_verified.json`

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Test your changes locally
4. Submit a pull request

**Areas for contribution:**
- Additional test scenarios
- Documentation improvements
- Bug fixes
- New API endpoint support

---

## 📈 Key Findings

### What Works Well
- ⚡ **Ultra-fast models:** 23 models respond in <0.3s
- 🔥 **Large models optimized:** 70B models in 0.46s!
- ✅ **Vision models:** 85.7% success rate
- ✅ **Embeddings:** 60% success rate

### What Doesn't Work
- ❌ **Not on free tier:** 46 models (404 errors)
- ❌ **Deprecated:** 9 models (HTTP 410)
- ❌ **Rerank endpoint:** Not available on free tier
- ❌ **Rate limited:** Some very large models

### Surprises
- 🚀 `qwen/qwen3-next-80b-a3b-instruct` - 80B params in 0.27s!
- 🚀 `meta/llama-3.3-70b-instruct` - 70B params in 0.46s!
- ⚡ `mistralai/mistral-small-4-119b-2603` - Fastest at 0.16s

---

## 📊 Success Rate by Publisher

| Publisher | Working | Total | Success Rate |
|-----------|---------|-------|--------------|
| OpenAI | 2 | 2 | 100% |
| Meta | 9 | 15 | 60% |
| Google | 3 | 5 | 60% |
| NVIDIA | 26 | 60 | 43.3% ⭐ Most models |
| Mistral AI | 4 | 9 | 44.4% |

---

## 📅 Update Schedule

- **Automated Tests:** Daily at 3:00 AM UTC
- **Documentation:** Auto-updated after each test
- **Retention:** Test artifacts kept for 30 days

---

## 🔒 Security

- ✅ API keys stored in GitHub Secrets (never in code)
- ✅ `.gitignore` excludes sensitive files
- ✅ Environment variable support
- ✅ No hardcoded credentials

**See:** [GITHUB_SETUP.md](GITHUB_SETUP.md) for security best practices

---

## 📄 License

MIT License - feel free to use, modify, and distribute.

---

## 🌟 Star This Repo

If this helps you, please ⭐ star the repository!

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/YOUR_USERNAME/nvidia-nim-api-testing/issues)
- **Discussions:** [GitHub Discussions](https://github.com/YOUR_USERNAME/nvidia-nim-api-testing/discussions)
- **NVIDIA API:** https://build.nvidia.com/

---

## 🔗 Resources

- **NVIDIA NIM Documentation:** https://docs.api.nvidia.com/nim/
- **API Reference:** https://docs.api.nvidia.com/nim/reference/
- **Model Catalog:** https://build.nvidia.com/models

---

**🤖 Automated with GitHub Actions | 📊 Updated Daily | ⭐ 52 Working Models**

---

*This repository is not officially affiliated with NVIDIA. It's a community project for testing and documentation purposes.*
