# PowerShell script to forcefully clean .next directory
# Handles Windows EBUSY file locking issues with Next.js/Turbopack

Write-Host "Cleaning .next directory..." -ForegroundColor Yellow

# 1. Stop all Node processes (Next.js dev server, Convex, etc.)
Write-Host "Stopping Node.js processes..." -ForegroundColor Cyan
Get-Process | Where-Object { $_.ProcessName -eq "node" } | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 3

# 2. Try cmd rmdir (sometimes works when PowerShell Remove-Item fails)
if (Test-Path .next) {
    Write-Host "Removing .next directory..." -ForegroundColor Cyan
    $maxRetries = 5
    $retryCount = 0
    $deleted = $false

    while ($retryCount -lt $maxRetries) {
        try {
            # Prefer cmd /c rmdir - often handles Windows locks better
            cmd /c "rmdir /s /q .next" 2>$null
            if (-not (Test-Path .next)) {
                $deleted = $true
                break
            }
        } catch {}

        # Fallback: PowerShell Remove-Item
        try {
            Remove-Item -Recurse -Force .next -ErrorAction Stop
            $deleted = $true
            break
        } catch {
            $retryCount++
            if ($retryCount -lt $maxRetries) {
                Write-Host "Retry $retryCount/$maxRetries - Waiting..." -ForegroundColor Yellow
                Get-Process | Where-Object { $_.ProcessName -eq "node" } | Stop-Process -Force -ErrorAction SilentlyContinue
                Start-Sleep -Seconds 4
            }
        }
    }

    if ($deleted -or -not (Test-Path .next)) {
        Write-Host "✓ .next directory deleted!" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed after $maxRetries attempts." -ForegroundColor Red
        Write-Host "  Close VS Code, Cursor, and any file watchers, then run: npm run clean" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "✓ .next does not exist" -ForegroundColor Green
}

Write-Host "Cleanup complete!" -ForegroundColor Green
