# PowerShell Script to Setup Daily Scheduled Task
# Run this script to schedule daily NVIDIA NIM API testing

param(
    [string]$Time = "03:00"  # Default: 3:00 AM
)

Write-Host "`n╔══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  📅 Setting Up Daily NVIDIA NIM Update Task        ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Configuration
$TaskName = "NVIDIA_NIM_Daily_Update"
$ScriptPath = Join-Path $PSScriptRoot "daily_update.js"
$NodePath = (Get-Command node -ErrorAction SilentlyContinue).Source
$LogPath = Join-Path $PSScriptRoot "logs"

# Check if Node.js is installed
if (-not $NodePath) {
    Write-Host "❌ Node.js not found! Please install Node.js first." -ForegroundColor Red
    Write-Host "   Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Node.js found: $NodePath" -ForegroundColor Green

# Check if daily_update.js exists
if (-not (Test-Path $ScriptPath)) {
    Write-Host "❌ Script not found: $ScriptPath" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Script found: $ScriptPath" -ForegroundColor Green

# Create logs directory
if (-not (Test-Path $LogPath)) {
    New-Item -ItemType Directory -Path $LogPath | Out-Null
    Write-Host "✅ Created logs directory: $LogPath" -ForegroundColor Green
}

# Remove existing task if it exists
$ExistingTask = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
if ($ExistingTask) {
    Write-Host "`n⚠️  Task '$TaskName' already exists. Removing..." -ForegroundColor Yellow
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
}

# Create the action
$LogFile = Join-Path $LogPath "daily_update_$(Get-Date -Format 'yyyyMMdd').log"
$Action = New-ScheduledTaskAction `
    -Execute $NodePath `
    -Argument "`"$ScriptPath`" > `"$LogFile`" 2>&1" `
    -WorkingDirectory $PSScriptRoot

# Create the trigger (daily at specified time)
$Trigger = New-ScheduledTaskTrigger -Daily -At $Time

# Create settings
$Settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RunOnlyIfNetworkAvailable

# Register the task
try {
    Register-ScheduledTask `
        -TaskName $TaskName `
        -Action $Action `
        -Trigger $Trigger `
        -Settings $Settings `
        -Description "Daily NVIDIA NIM API testing and documentation update" `
        -ErrorAction Stop | Out-Null
    
    Write-Host "`n✅ Scheduled task created successfully!" -ForegroundColor Green
    Write-Host "`n📋 Task Details:" -ForegroundColor Cyan
    Write-Host "   Name: $TaskName"
    Write-Host "   Time: $Time (daily)"
    Write-Host "   Script: $ScriptPath"
    Write-Host "   Logs: $LogPath"
    
    Write-Host "`n🔧 Management Commands:" -ForegroundColor Yellow
    Write-Host "   View task:    Get-ScheduledTask -TaskName '$TaskName'"
    Write-Host "   Run now:      Start-ScheduledTask -TaskName '$TaskName'"
    Write-Host "   Disable:      Disable-ScheduledTask -TaskName '$TaskName'"
    Write-Host "   Enable:       Enable-ScheduledTask -TaskName '$TaskName'"
    Write-Host "   Remove:       Unregister-ScheduledTask -TaskName '$TaskName' -Confirm:`$false"
    
    Write-Host "`n💡 Test it now with:" -ForegroundColor Green
    Write-Host "   Start-ScheduledTask -TaskName '$TaskName'" -ForegroundColor White
    
} catch {
    Write-Host "`n❌ Failed to create scheduled task!" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host "`nYou may need to run PowerShell as Administrator." -ForegroundColor Yellow
    exit 1
}

Write-Host "`n╔══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  ✅ Setup Complete!                                 ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan
