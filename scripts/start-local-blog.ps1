$ErrorActionPreference = 'Stop'

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$siteUrl = 'http://127.0.0.1:4321/'

$listener = Get-NetTCPConnection -LocalPort 4321 -State Listen -ErrorAction SilentlyContinue
if ($listener) {
  try {
    $response = Invoke-WebRequest -Uri $siteUrl -UseBasicParsing -TimeoutSec 4
    if ($response.StatusCode -eq 200 -and $response.Content -match 'heresAgu') {
      Start-Process -FilePath $siteUrl
      return
    }
  } catch {
    # Port 4321 belongs to another process or the server is still starting.
  }

  Write-Host 'Port 4321 is already in use. Close that program, then try again.'
  Read-Host 'Press Enter to close this window'
  exit 1
}

$bun = Get-Command bun -ErrorAction SilentlyContinue
if (-not $bun) {
  Write-Host 'Bun was not found. Check that Bun is installed and available in PATH.'
  Read-Host 'Press Enter to close this window'
  exit 1
}

Set-Location -LiteralPath $projectRoot
& $bun.Source run dev --host 127.0.0.1 --port 4321 --open

if ($LASTEXITCODE -ne 0) {
  Read-Host 'The blog stopped with an error. Press Enter to close this window'
  exit $LASTEXITCODE
}
