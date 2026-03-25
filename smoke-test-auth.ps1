$ErrorActionPreference = 'Stop'

$scriptPath = Join-Path $PSScriptRoot 'infra\smoke-test-auth.ps1'
if (-not (Test-Path $scriptPath)) {
    throw "Smoke test script not found: $scriptPath"
}

powershell -ExecutionPolicy Bypass -File $scriptPath
