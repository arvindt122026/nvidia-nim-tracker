# GitHub Repository Setup Guide

Complete guide to set up automated daily NVIDIA NIM API testing on GitHub with secure API key management.

---

## 🎯 Overview

This setup will:
- ✅ Create a public GitHub repository
- ✅ Store API key securely (never in code)
- ✅ Run automated tests daily at 3:00 AM UTC
- ✅ Update documentation automatically
- ✅ Track changes over time
- ✅ Generate test reports

---

## 📋 Prerequisites

- GitHub account
- Git installed locally
- NVIDIA API key (from build.nvidia.com)

---

## 🚀 Step-by-Step Setup

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `nvidia-nim-api-testing` (or your choice)
3. Description: `Automated daily testing of NVIDIA NIM API models`
4. **Choose:** Public ✅
5. **Do NOT** initialize with README (we have files already)
6. Click "Create repository"

### Step 2: Initialize Local Git Repository

Open terminal/PowerShell in your project directory:

```bash
cd "C:\Users\arvin\Documents\NVIDIA Key tester"

# Initialize git (if not already)
git init

# Add all files (key.txt is excluded by .gitignore)
git add -A

# Verify key.txt is NOT staged
git status
# Should show key.txt as "untracked" or not listed

# Commit
git commit -m "Initial commit: NVIDIA NIM API testing automation"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/nvidia-nim-api-testing.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Add API Key as GitHub Secret

**CRITICAL: Never commit your API key to the repository!**

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NVIDIA_API_KEY`
5. Value: Your API key (e.g., `nvapi-xxxxx...`)
6. Click **Add secret**

### Step 4: Enable GitHub Actions

1. Go to your repository
2. Click **Actions** tab
3. Click "I understand my workflows, go ahead and enable them"
4. The workflow should appear: "Daily NVIDIA NIM API Testing"

### Step 5: Test the Workflow

**Manual trigger (recommended first time):**

1. Go to **Actions** tab
2. Click "Daily NVIDIA NIM API Testing"
3. Click **Run workflow** → **Run workflow**
4. Wait 8-10 minutes for completion
5. Check the results!

---

## 📊 What Happens Daily

### Automatic Schedule (3:00 AM UTC)
- Tests all 161 NVIDIA NIM models
- Generates fresh documentation
- Commits changes to repository
- Creates downloadable artifacts

### You'll See:
- Updated `NVIDIA_NIM_ULTIMATE_ALL_IN_ONE.md`
- Fresh `comprehensive_test_results_complete.json`
- Updated `all_working_models_verified.json`
- Commit: "🤖 Automated daily update - YYYY-MM-DD"

---

## 🔍 Monitoring & Reports

### View Workflow Runs

1. Go to repository **Actions** tab
2. See all runs with status (✅ success, ❌ failed)
3. Click any run to see details

### View Test Summary

Each workflow run shows:
- Total models tested
- Working models count
- Failed models count
- Success percentage
- Link to updated documentation

### Download Artifacts

1. Go to workflow run
2. Scroll to "Artifacts" section
3. Download `test-results-XXX` (kept for 30 days)

### View Changes Over Time

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/nvidia-nim-api-testing.git
cd nvidia-nim-api-testing

# View commit history
git log --oneline

# Compare two dates
git diff <old-commit> <new-commit> comprehensive_test_results_complete.json
```

---

## 🔧 Configuration Options

### Change Schedule Time

Edit `.github/workflows/daily-test.yml`:

```yaml
schedule:
  - cron: '0 3 * * *'  # 3:00 AM UTC
  # Change to:
  - cron: '0 14 * * *'  # 2:00 PM UTC
  # Or run multiple times:
  - cron: '0 3,15 * * *'  # 3:00 AM and 3:00 PM UTC
```

Cron format: `minute hour day month weekday`
- `0 3 * * *` = 3:00 AM daily
- `0 */6 * * *` = Every 6 hours
- `0 0 * * 0` = Sunday midnight
- Use: https://crontab.guru/ for help

### Run on Different Events

Add to `.github/workflows/daily-test.yml`:

```yaml
on:
  schedule:
    - cron: '0 3 * * *'
  workflow_dispatch:  # Manual trigger
  push:
    branches: [ main ]  # On every push
  pull_request:  # On pull requests
```

### Notification Setup

Add email notifications:

1. Go to repository **Settings**
2. **Notifications**
3. Enable "Actions" notifications

Or use Slack/Discord webhooks (advanced).

---

## 🛡️ Security Best Practices

### ✅ DO:
- Store API key in GitHub Secrets
- Use `.gitignore` to exclude `key.txt`
- Review commits before pushing
- Use environment variables
- Rotate API keys periodically

### ❌ DON'T:
- Never commit `key.txt`
- Never hardcode API keys in code
- Never share secrets in issues/PRs
- Never log API keys in workflow

### Verify Security:

```bash
# Check what will be committed
git status

# Search for potential secrets in staged files
git diff --cached | grep -i "nvapi-"

# Check entire history for accidents (if worried)
git log --all --full-history -- key.txt
```

---

## 📈 Cost & Limits

### GitHub Actions Free Tier:
- **Public repos:** Unlimited minutes ✅
- **Private repos:** 2,000 minutes/month
- **Storage:** 500 MB artifacts

### NVIDIA API Free Tier:
- **Rate limit:** 45 requests/minute
- **Monthly:** Check build.nvidia.com for limits
- **Test duration:** ~10 minutes = 1 test cycle

### Daily Usage:
- **GitHub:** ~10 minutes/day = 300 minutes/month (free!)
- **NVIDIA:** ~161 API calls/day = ~4,830/month

---

## 🐛 Troubleshooting

### Workflow Fails with "API Key Error"

**Problem:** API key not found

**Solution:**
1. Check GitHub Secrets: Settings → Secrets → Actions
2. Verify secret name is exactly `NVIDIA_API_KEY`
3. Check secret value has no extra spaces
4. Re-create the secret if needed

### Workflow Fails with "Rate Limited"

**Problem:** Too many requests

**Solution:**
- Wait 24 hours (daily quota reset)
- Check if multiple workflows are running
- Increase `RATE_LIMIT_DELAY` in code

### No Changes Committed

**Problem:** Tests ran but nothing committed

**Solution:**
- Check if results actually changed
- View workflow logs for "Check for changes" step
- This is normal if no models changed status

### Workflow Doesn't Run Automatically

**Problem:** No scheduled runs appearing

**Solution:**
1. Verify workflow file is in `.github/workflows/`
2. Check YAML syntax: https://www.yamllint.com/
3. Repository must have at least 1 commit in last 60 days
4. Check Actions tab is enabled

---

## 📁 Repository Structure (Public)

```
nvidia-nim-api-testing/
├── .github/
│   └── workflows/
│       └── daily-test.yml          ✅ GitHub Actions workflow
│
├── NVIDIA_NIM_ULTIMATE_ALL_IN_ONE.md  ✅ Main guide (updated daily)
├── README.md                          ✅ Project overview
├── GITHUB_SETUP.md                    ✅ This file
├── AUTOMATION_GUIDE.md                ✅ Automation docs
├── QUICK_SETUP.md                     ✅ Quick start
├── USAGE_GUIDE.md                     ✅ API patterns
├── WORKING_MODELS.md                  ✅ Baseline
├── REPO_STRUCTURE.md                  ✅ Structure docs
│
├── test_all_comprehensive.js          ✅ Test script
├── package.json                       ✅ Dependencies
├── .gitignore                         ✅ Excludes key.txt
│
├── comprehensive_test_results_complete.json  ✅ Updated daily
├── all_working_models_verified.json          ✅ Updated daily
├── working_models_list.txt                   ✅ Updated daily
│
└── key.txt                            ❌ NEVER committed (in .gitignore)
```

---

## 🎉 Success Checklist

- [ ] Repository created on GitHub
- [ ] Local git initialized and pushed
- [ ] API key added to GitHub Secrets
- [ ] Verified `key.txt` not in repository
- [ ] GitHub Actions enabled
- [ ] First workflow run successful
- [ ] Documentation updated automatically
- [ ] Scheduled workflow appears in Actions tab

---

## 📞 Common Questions

### Q: Can I use a private repository?
**A:** Yes! GitHub Actions work on private repos too (2,000 free minutes/month).

### Q: What if my API key expires?
**A:** Update the GitHub Secret with new key. No code changes needed.

### Q: Can I run tests more frequently?
**A:** Yes, but watch your NVIDIA API quota. Edit cron schedule.

### Q: How do I share results?
**A:** Share the GitHub repo URL. Documentation is public.

### Q: Can I customize the workflow?
**A:** Yes! Edit `.github/workflows/daily-test.yml` as needed.

### Q: What timezone is the schedule?
**A:** UTC. Convert your local time to UTC for scheduling.

---

## 🔗 Useful Links

- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **Cron Schedule Help:** https://crontab.guru/
- **NVIDIA API:** https://build.nvidia.com/
- **Git Basics:** https://git-scm.com/book/en/v2

---

## 📝 Next Steps

1. ✅ Complete setup above
2. ✅ Test manual workflow run
3. ✅ Wait for first scheduled run (3:00 AM UTC)
4. ✅ Share your repo with the community!
5. ✅ Monitor daily updates

---

**✅ Your automated testing is now live on GitHub!**

*Last Updated: June 18, 2026*
