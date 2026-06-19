# Quick Start: Deploy to GitHub

**Get your automated testing running on GitHub in 10 minutes!**

---

## 🚀 Super Quick Method

### Step 1: Run Deployment Script (2 minutes)

```powershell
cd "C:\Users\arvin\Documents\NVIDIA Key tester"
.\deploy-to-github.ps1 -GitHubUsername "YOUR_GITHUB_USERNAME"
```

This script:
- ✅ Verifies your API key is secure
- ✅ Initializes git repository
- ✅ Stages all files
- ✅ Creates commit
- ✅ Configures remote
- ✅ Shows next steps

### Step 2: Create Repository on GitHub (2 minutes)

1. Go to https://github.com/new
2. Name: `nvidia-nim-api-testing`
3. Make it **Public**
4. **Don't** check any initialization boxes
5. Click **Create repository**

### Step 3: Push Your Code (1 minute)

```bash
git branch -M main
git push -u origin main
```

### Step 4: Add API Key Secret (2 minutes)

1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `NVIDIA_API_KEY`
4. Value: Copy from your `key.txt` file
5. Click **Add secret**

### Step 5: Enable & Test (3 minutes)

1. Go to **Actions** tab
2. Enable workflows
3. Click **"Daily NVIDIA NIM API Testing"**
4. Click **Run workflow** → **Run workflow**
5. Wait ~10 minutes
6. Check results! ✅

---

## ✅ Done!

Your automated testing is now live! It will:
- 🔄 Run daily at 3:00 AM UTC
- 📝 Update documentation automatically
- 📊 Track model changes over time
- 💾 Save results for 30 days

---

## 🔍 Quick Checks

### Verify API Key is Secure

```bash
# This should show key.txt as "untracked" or not listed
git status

# This should return nothing (key.txt excluded)
git ls-files | grep key.txt
```

### View What Will Be Public

```bash
git ls-files
```

### Check Workflow Configuration

View: `.github/workflows/daily-test.yml`

---

## 🎯 What's Public vs Private

### ✅ Public (Safe to Share):
- All code and scripts
- Documentation
- Test results
- Workflow configuration
- Historical data

### 🔒 Private (Never Shared):
- `key.txt` - Your API key (gitignored)
- GitHub Secret `NVIDIA_API_KEY`
- Any local configuration

---

## 📊 After First Run

You'll see:
- ✅ Updated `NVIDIA_NIM_ULTIMATE_ALL_IN_ONE.md`
- ✅ Fresh test results JSON
- ✅ New commit: "🤖 Automated daily update - 2026-06-18"
- ✅ Green checkmark on Actions tab

---

## 🐛 Troubleshooting

### "Remote already exists"

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/nvidia-nim-api-testing.git
```

### "key.txt would be committed"

```bash
# Remove from staging
git reset key.txt

# Verify .gitignore
echo "key.txt" >> .gitignore
```

### "Authentication failed"

Use GitHub CLI or Personal Access Token:
```bash
# With GitHub CLI (recommended)
gh auth login

# Or use HTTPS with token
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/nvidia-nim-api-testing.git
```

---

## 📖 Need More Details?

See **[GITHUB_SETUP.md](GITHUB_SETUP.md)** for complete documentation.

---

**🎉 You're all set! Star the repo and share with the community!**
