# NVIDIA NIM Daily Automation Setup Guide

Automatically test all NVIDIA NIM models and generate fresh documentation daily.

---

## 🎯 What This Does

Every day at your chosen time, the system will:
1. ✅ Clean up old/redundant files
2. ✅ Test all 161 NVIDIA NIM API models
3. ✅ Generate fresh `NVIDIA_NIM_ULTIMATE_ALL_IN_ONE.md`
4. ✅ Keep only essential files
5. ✅ Log results for review

---

## 🚀 Quick Setup (Windows)

### Step 1: Run Setup Script

Open PowerShell **as Administrator** and run:

```powershell
cd "C:\Users\arvin\Documents\NVIDIA Key tester"
.\setup_daily_task.ps1
```

**Optional:** Specify custom time:
```powershell
.\setup_daily_task.ps1 -Time "02:00"  # 2:00 AM
.\setup_daily_task.ps1 -Time "14:30"  # 2:30 PM
```

### Step 2: Verify Setup

```powershell
# Check if task was created
Get-ScheduledTask -TaskName "NVIDIA_NIM_Daily_Update"

# Test run it now
Start-ScheduledTask -TaskName "NVIDIA_NIM_Daily_Update"
```

### Step 3: Check Logs

Logs are saved in: `C:\Users\arvin\Documents\NVIDIA Key tester\logs\`

```powershell
# View latest log
Get-Content ".\logs\daily_update_*.log" | Select-Object -Last 50
```

---

## 📋 What Gets Kept

After each run, only these files remain:

### 📘 Documentation
- `NVIDIA_NIM_ULTIMATE_ALL_IN_ONE.md` - Fresh comprehensive guide
- `README.md` - Quick navigation
- `USAGE_GUIDE.md` - Reference
- `WORKING_MODELS.md` - Comparison baseline

### 📊 Data Files
- `comprehensive_test_results_complete.json` - All test results
- `all_working_models_verified.json` - Working models
- `working_models_list.txt` - Simple list

### 🔧 Scripts
- `test_all_comprehensive.js` - Main test script
- `daily_update.js` - Automation script
- `setup_daily_task.ps1` - Setup script
- `package.json` - Dependencies

### 📁 Logs
- `logs/daily_update_YYYYMMDD.log` - Daily execution logs

---

## 🔧 Management Commands

### View Task Status
```powershell
Get-ScheduledTask -TaskName "NVIDIA_NIM_Daily_Update" | Format-List
```

### Run Manually (Test)
```powershell
Start-ScheduledTask -TaskName "NVIDIA_NIM_Daily_Update"
```

### Disable Task
```powershell
Disable-ScheduledTask -TaskName "NVIDIA_NIM_Daily_Update"
```

### Enable Task
```powershell
Enable-ScheduledTask -TaskName "NVIDIA_NIM_Daily_Update"
```

### Change Schedule Time
```powershell
# Remove old task
Unregister-ScheduledTask -TaskName "NVIDIA_NIM_Daily_Update" -Confirm:$false

# Run setup with new time
.\setup_daily_task.ps1 -Time "04:00"
```

### Remove Task Completely
```powershell
Unregister-ScheduledTask -TaskName "NVIDIA_NIM_Daily_Update" -Confirm:$false
```

---

## 📊 Monitoring

### Check Last Run Status
```powershell
Get-ScheduledTask -TaskName "NVIDIA_NIM_Daily_Update" | Get-ScheduledTaskInfo
```

### View Latest Log
```powershell
# Show last 100 lines of today's log
$today = Get-Date -Format "yyyyMMdd"
Get-Content ".\logs\daily_update_$today.log" -Tail 100
```

### Check for Errors
```powershell
# Search for errors in today's log
$today = Get-Date -Format "yyyyMMdd"
Select-String -Path ".\logs\daily_update_$today.log" -Pattern "error|failed|❌"
```

---

## 🐛 Troubleshooting

### Task Not Running?

**Check task status:**
```powershell
Get-ScheduledTask -TaskName "NVIDIA_NIM_Daily_Update"
```

**Check last run result:**
```powershell
Get-ScheduledTask -TaskName "NVIDIA_NIM_Daily_Update" | Get-ScheduledTaskInfo
```

**Common issues:**
1. ❌ **Computer was off/sleeping** → Enable "Start when available" (already set)
2. ❌ **No network connection** → Task waits for network (already set)
3. ❌ **API key expired** → Update your NVIDIA API key
4. ❌ **Node.js not in PATH** → Reinstall Node.js or fix PATH

### Manual Test Run

```powershell
# Run directly to see output
cd "C:\Users\arvin\Documents\NVIDIA Key tester"
node daily_update.js
```

### Reset Everything

```powershell
# Remove task
Unregister-ScheduledTask -TaskName "NVIDIA_NIM_Daily_Update" -Confirm:$false

# Clean logs
Remove-Item ".\logs\*" -Force

# Setup again
.\setup_daily_task.ps1
```

---

## ⚙️ Customization

### Change What Files to Keep

Edit `daily_update.js` and modify the `KEEP_FILES` array:

```javascript
const KEEP_FILES = [
  'test_all_comprehensive.js',
  'daily_update.js',
  // Add your files here
];
```

### Change Test Frequency

To run multiple times per day:

```powershell
# Create additional triggers
$task = Get-ScheduledTask -TaskName "NVIDIA_NIM_Daily_Update"
$trigger2 = New-ScheduledTaskTrigger -Daily -At "18:00"  # 6 PM
$task.Triggers += $trigger2
Set-ScheduledTask -InputObject $task
```

### Email Notifications (Optional)

Add to `daily_update.js`:

```javascript
// At the end of the script
const nodemailer = require('nodemailer');
// Send email with results...
```

---

## 📈 Expected Execution Time

- **Full test cycle:** 8-10 minutes
- **Network dependent:** Yes (API calls)
- **Rate limited:** 45 requests/minute (built-in delays)

---

## 🔒 Security Notes

- ✅ API key stored in environment variables (recommended)
- ✅ Task runs under your user account
- ✅ Logs stored locally only
- ✅ No external data sharing

---

## 📞 Support

If you encounter issues:

1. Check logs: `.\logs\daily_update_*.log`
2. Run manual test: `node daily_update.js`
3. Verify Node.js: `node --version`
4. Check API key: Ensure it's valid on build.nvidia.com

---

## 🎉 Success Indicators

After successful run:
- ✅ `NVIDIA_NIM_ULTIMATE_ALL_IN_ONE.md` updated with today's date
- ✅ `comprehensive_test_results_complete.json` has fresh data
- ✅ Log file shows "✅ Daily Update Complete!"
- ✅ Only essential files remain in directory

---

*Last Updated: June 18, 2026*
