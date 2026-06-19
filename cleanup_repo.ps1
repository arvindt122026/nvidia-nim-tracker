# Cleanup Script - Keep Only Essential Files
# Removes all old test scripts, redundant data files, and temporary files

Write-Host ""
Write-Host "========================================================" -ForegroundColor Yellow
Write-Host "  CLEANING REPOSITORY - KEEP ONLY ESSENTIALS" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Yellow
Write-Host ""

# Define files to KEEP
$keepFiles = @(
    # === ESSENTIAL SCRIPTS ===
    'test_all_comprehensive.js',
    'daily_update.js',
    'setup_daily_task.ps1',
    'cleanup_repo.ps1',
    
    # === ESSENTIAL DOCUMENTATION ===
    'NVIDIA_NIM_ULTIMATE_ALL_IN_ONE.md',
    'README.md',
    'USAGE_GUIDE.md',
    'WORKING_MODELS.md',
    'AUTOMATION_GUIDE.md',
    'QUICK_SETUP.md',
    'START_HERE.txt',
    'REPO_STRUCTURE.md',
    
    # === ESSENTIAL DATA (will be regenerated) ===
    'comprehensive_test_results_complete.json',
    'all_working_models_verified.json',
    'working_models_list.txt',
    
    # === CONFIGURATION ===
    'package.json',
    'package-lock.json',
    '.gitignore',
    'key.txt'
)

Write-Host "Files marked to KEEP:" -ForegroundColor Green
$keepFiles | ForEach-Object { Write-Host "  [KEEP] $_" -ForegroundColor Green }

Write-Host ""
Write-Host "Scanning for files to DELETE..." -ForegroundColor Yellow
Write-Host ""

$deletedCount = 0
$keptCount = 0

Get-ChildItem -File | ForEach-Object {
    if ($keepFiles -contains $_.Name) {
        Write-Host "  [KEEP] $($_.Name)" -ForegroundColor Green
        $keptCount++
    } else {
        Write-Host "  [DELETE] $($_.Name)" -ForegroundColor Red
        Remove-Item $_.FullName -Force
        $deletedCount++
    }
}

Write-Host ""
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  CLEANUP SUMMARY" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Files Kept:    $keptCount" -ForegroundColor Green
Write-Host "  Files Deleted: $deletedCount" -ForegroundColor Red
Write-Host ""
Write-Host "  Repository is now clean and organized!" -ForegroundColor Green
Write-Host ""
