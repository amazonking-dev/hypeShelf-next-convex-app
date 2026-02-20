# PowerShell script to forcefully clean .next directory
# This handles Windows file locking issues

Write-Host "Cleaning .next directory..." -ForegroundColor Yellow

# Stop all Node processes
Write-Host "Stopping Node.js processes..." -ForegroundColor Cyan
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Try to delete .next directory
if (Test-Path .next) {
    Write-Host "Removing .next directory..." -ForegroundColor Cyan
    $maxRetries = 5
    $retryCount = 0
    
    while ($retryCount -lt $maxRetries) {
        try {
            Remove-Item -Recurse -Force .next -ErrorAction Stop
            Write-Host "✓ .next directory deleted successfully!" -ForegroundColor Green
            break
        } catch {
            $retryCount++
            if ($retryCount -lt $maxRetries) {
                Write-Host "Retry $retryCount/$maxRetries - Waiting before retry..." -ForegroundColor Yellow
                Start-Sleep -Seconds 3
                
                # Try to unlock files using handle.exe if available, or just wait
                Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force -ErrorAction SilentlyContinue
            } else {
                Write-Host "✗ Failed to delete .next after $maxRetries attempts" -ForegroundColor Red
                Write-Host "Please manually delete the .next folder and restart" -ForegroundColor Yellow
                exit 1
            }
        }
    }
} else {
    Write-Host "✓ .next directory does not exist" -ForegroundColor Green
}

Write-Host "Cleanup complete!" -ForegroundColor Green
