# Quick Setup - Daily Automated Testing

## 🚀 One-Time Setup (5 minutes)

### Step 1: Open PowerShell as Administrator

Right-click PowerShell → "Run as Administrator"

### Step 2: Navigate to Directory

```powershell
cd "C:\Users\arvin\Documents\NVIDIA Key tester"
```

### Step 3: Run Setup

```powershell
.\setup_daily_task.ps1
```

**Want a different time?**
```powershell
.\setup_daily_task.ps1 -Time "04:00"  # 4:00 AM
.\setup_daily_task.ps1 -Time "14:30"  # 2:30 PM
```

### Step 4: Test It (Optional)

```powershell
# Run immediately to test
Start-ScheduledTask -TaskName "NVIDIA_NIM_Daily_Update"

# Check logs
Get-Content ".\logs\daily_update_*.log" -Tail 50
```

---

## ✅ Done!

Every day, the system will automatically:
1. Test all 161 NVIDIA NIM models
2. Generate fresh documentation
3. Clean up old files
4. Keep only what's needed

---

## 📋 Daily Output

After each run, you'll have:
- ✅ Fresh `NVIDIA_NIM_ULTIMATE_ALL_IN_ONE.md`
- ✅ Updated test results (JSON)
- ✅ Clean repository (no clutter)
- ✅ Execution logs in `logs/` folder

---

## 🔧 Quick Commands

```powershell
# Check status
Get-ScheduledTask -TaskName "NVIDIA_NIM_Daily_Update"

# Run now
Start-ScheduledTask -TaskName "NVIDIA_NIM_Daily_Update"

# View latest log
Get-Content ".\logs\daily_update_$(Get-Date -Format 'yyyyMMdd').log"

# Remove task
Unregister-ScheduledTask -TaskName "NVIDIA_NIM_Daily_Update" -Confirm:$false
```

---

## 📖 Full Documentation

See [AUTOMATION_GUIDE.md](AUTOMATION_GUIDE.md) for complete details.

---

**That's it!** 🎉
