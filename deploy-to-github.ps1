# Deploy to GitHub Script
# Helps you set up the repository on GitHub with proper configuration

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [string]$RepoName = "nvidia-nim-api-testing"
)

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host "  DEPLOY TO GITHUB - NVIDIA NIM API TESTING" -ForegroundColor Cyan
Write-Host "========================================================`n" -ForegroundColor Cyan

# Step 1: Verify key.txt is not in staging
Write-Host "Step 1: Security Check..." -ForegroundColor Yellow

if (Test-Path "key.txt") {
    Write-Host "  [CHECK] key.txt exists locally" -ForegroundColor Green
    
    # Check if it would be committed
    git add -A 2>$null
    $status = git status --short
    if ($status -match "key.txt") {
        Write-Host "  [ERROR] key.txt would be committed! This should not happen." -ForegroundColor Red
        Write-Host "  [INFO] Check your .gitignore file" -ForegroundColor Yellow
        exit 1
    } else {
        Write-Host "  [OK] key.txt is properly ignored by git" -ForegroundColor Green
    }
} else {
    Write-Host "  [WARNING] key.txt not found - you'll need to set NVIDIA_API_KEY in GitHub Secrets" -ForegroundColor Yellow
}

# Step 2: Initialize git if needed
Write-Host "`nStep 2: Initialize Git Repository..." -ForegroundColor Yellow

if (-not (Test-Path ".git")) {
    git init
    Write-Host "  [OK] Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "  [OK] Git repository already initialized" -ForegroundColor Green
}

# Step 3: Add files
Write-Host "`nStep 3: Staging Files..." -ForegroundColor Yellow

git add -A
Write-Host "  [OK] Files staged" -ForegroundColor Green

# Show what will be committed
Write-Host "`n  Files to be committed:" -ForegroundColor Cyan
git status --short | ForEach-Object { Write-Host "    $_" -ForegroundColor White }

# Step 4: Commit
Write-Host "`nStep 4: Creating Commit..." -ForegroundColor Yellow

$commitExists = git log --oneline 2>$null
if (-not $commitExists) {
    git commit -m "Initial commit: Automated NVIDIA NIM API testing with daily updates"
    Write-Host "  [OK] Initial commit created" -ForegroundColor Green
} else {
    $hasChanges = git status --short
    if ($hasChanges) {
        git commit -m "Update: Latest changes before GitHub deployment"
        Write-Host "  [OK] Changes committed" -ForegroundColor Green
    } else {
        Write-Host "  [OK] No changes to commit" -ForegroundColor Green
    }
}

# Step 5: Add remote
Write-Host "`nStep 5: Configuring Remote..." -ForegroundColor Yellow

$remoteUrl = "https://github.com/$GitHubUsername/$RepoName.git"
$existingRemote = git remote get-url origin 2>$null

if ($existingRemote) {
    Write-Host "  [INFO] Remote already configured: $existingRemote" -ForegroundColor Yellow
    Write-Host "  [INFO] To change, run: git remote set-url origin $remoteUrl" -ForegroundColor Yellow
} else {
    git remote add origin $remoteUrl
    Write-Host "  [OK] Remote added: $remoteUrl" -ForegroundColor Green
}

# Step 6: Instructions
Write-Host "`n========================================================" -ForegroundColor Green
Write-Host "  NEXT STEPS - COMPLETE ON GITHUB" -ForegroundColor Green
Write-Host "========================================================`n" -ForegroundColor Green

Write-Host "1. CREATE REPOSITORY ON GITHUB:" -ForegroundColor Cyan
Write-Host "   -> Go to: https://github.com/new" -ForegroundColor White
Write-Host "   -> Name: $RepoName" -ForegroundColor White
Write-Host "   -> Make it PUBLIC" -ForegroundColor White
Write-Host "   -> Do NOT initialize with README" -ForegroundColor White
Write-Host "   -> Click 'Create repository'`n" -ForegroundColor White

Write-Host "2. PUSH YOUR CODE:" -ForegroundColor Cyan
Write-Host "   -> Run these commands:" -ForegroundColor White
Write-Host "      git branch -M main" -ForegroundColor Yellow
Write-Host "      git push -u origin main`n" -ForegroundColor Yellow

Write-Host "3. ADD API KEY SECRET:" -ForegroundColor Cyan
Write-Host "   -> Go to: https://github.com/$GitHubUsername/$RepoName/settings/secrets/actions" -ForegroundColor White
Write-Host "   -> Click 'New repository secret'" -ForegroundColor White
Write-Host "   -> Name: NVIDIA_API_KEY" -ForegroundColor White
Write-Host "   -> Value: [Your API key from key.txt]" -ForegroundColor White
Write-Host "   -> Click 'Add secret'`n" -ForegroundColor White

Write-Host "4. ENABLE GITHUB ACTIONS:" -ForegroundColor Cyan
Write-Host "   -> Go to: https://github.com/$GitHubUsername/$RepoName/actions" -ForegroundColor White
Write-Host "   -> Click 'I understand my workflows, go ahead and enable them'`n" -ForegroundColor White

Write-Host "5. TEST THE WORKFLOW:" -ForegroundColor Cyan
Write-Host "   -> Click 'Daily NVIDIA NIM API Testing'" -ForegroundColor White
Write-Host "   -> Click 'Run workflow' button" -ForegroundColor White
Write-Host "   -> Wait 8-10 minutes for results`n" -ForegroundColor White

Write-Host "========================================================" -ForegroundColor Green
Write-Host "  SETUP PREPARATION COMPLETE!" -ForegroundColor Green
Write-Host "========================================================`n" -ForegroundColor Green

Write-Host "Your repository URL will be:" -ForegroundColor Cyan
Write-Host "https://github.com/$GitHubUsername/$RepoName`n" -ForegroundColor White

Write-Host "For detailed instructions, see: GITHUB_SETUP.md`n" -ForegroundColor Yellow

# Show API key reminder
if (Test-Path "key.txt") {
    Write-Host "IMPORTANT: Your API key from key.txt needs to be added as a GitHub Secret!" -ForegroundColor Red
    Write-Host "           The key.txt file is NOT and will NOT be uploaded to GitHub.`n" -ForegroundColor Red
}
