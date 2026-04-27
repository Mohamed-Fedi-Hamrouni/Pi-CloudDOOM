[Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSUseApprovedVerbs', '', Justification = 'No custom cmdlets are declared in this script; suppress stale analyzer diagnostics.')]
param()

$ErrorActionPreference = 'Stop'

try {
  Write-Host "[INFO] Checking service health..." -ForegroundColor Cyan
  $userHealth = Invoke-RestMethod 'http://localhost:8081/actuator/health'
  $resourceHealth = Invoke-RestMethod 'http://localhost:8087/actuator/health'
  if ($userHealth.status -ne 'UP') { throw 'user-service is not UP' }
  if ($resourceHealth.status -ne 'UP') { throw 'resource-service is not UP' }
  Write-Host "[OK] user-service and resource-service are UP" -ForegroundColor Green

  Write-Host "[INFO] Getting Keycloak tokens (admin + user)..." -ForegroundColor Cyan
  $adminToken = (Invoke-RestMethod -Method Post -Uri 'http://localhost:8090/realms/myapp-realm/protocol/openid-connect/token' -ContentType 'application/x-www-form-urlencoded' -Body 'client_id=angular-client&grant_type=password&username=adminyosr@test.com&password=0000').access_token
  $userToken = (Invoke-RestMethod -Method Post -Uri 'http://localhost:8090/realms/myapp-realm/protocol/openid-connect/token' -ContentType 'application/x-www-form-urlencoded' -Body 'client_id=angular-client&grant_type=password&username=useryosr@test.com&password=0000').access_token
  if (-not $adminToken) { throw 'Admin token generation failed' }
  if (-not $userToken) { throw 'User token generation failed' }
  Write-Host "[OK] Token generation OK" -ForegroundColor Green

  Write-Host "[INFO] Checking user profiles..." -ForegroundColor Cyan
  $adminMe = Invoke-RestMethod -Method Get -Uri 'http://localhost:8081/api/users/me' -Headers @{ Authorization = "Bearer $adminToken" }
  $userMe = Invoke-RestMethod -Method Get -Uri 'http://localhost:8081/api/users/me' -Headers @{ Authorization = "Bearer $userToken" }
  Write-Host "[OK] Admin role: $($adminMe.role), User role: $($userMe.role)" -ForegroundColor Green

  Write-Host "[INFO] Checking resource catalog..." -ForegroundColor Cyan
  $categories = Invoke-RestMethod -Method Get -Uri 'http://localhost:8087/api/resources/categories'
  $resources = Invoke-RestMethod -Method Get -Uri 'http://localhost:8087/api/resources?page=0&size=10'
  Write-Host "[OK] Categories: $($categories.Count), Resources page count: $($resources.content.Count)" -ForegroundColor Green

  Write-Host "[INFO] Testing file upload (multipart -> MinIO)..." -ForegroundColor Cyan
  $tmp = Join-Path $env:TEMP 'validation-smoke-upload.pdf'
  Set-Content -Path $tmp -Value '%PDF-1.4 validation smoke upload' -Encoding Ascii
  $uploadJson = curl.exe -s "http://localhost:8087/api/resources/upload?kind=resource" -H "Authorization: Bearer $adminToken" -F "file=@$tmp;type=application/pdf"
  $upload = $uploadJson | ConvertFrom-Json
  if (-not $upload.fileUrl) { throw 'Upload failed: no file URL returned' }
  $public = Invoke-WebRequest -Method Get -Uri $upload.fileUrl -UseBasicParsing
  if ($public.StatusCode -ne 200) { throw 'Uploaded file URL is not publicly reachable' }
  Write-Host "[OK] Upload OK and public URL reachable" -ForegroundColor Green

  Write-Host "[INFO] Testing admin CRUD on resources..." -ForegroundColor Cyan
  $targetCategory = ($categories | Where-Object { $_.name -eq 'Algorithms' } | Select-Object -First 1)
  if (-not $targetCategory) { $targetCategory = $categories[0] }
  if (-not $targetCategory) { throw 'No category available for CRUD test' }

  $createBody = @{
    title = 'Validation Smoke Resource ' + [DateTime]::UtcNow.ToString('yyyyMMddHHmmss')
    description = 'Created by validation-smoke.ps1'
    url = $upload.fileUrl
    type = 'ARTICLE'
    level = 'BEGINNER'
    industry = 'TECHNOLOGY'
    thumbUrl = $null
    categoryId = $targetCategory.id
  } | ConvertTo-Json

  $created = Invoke-RestMethod -Method Post -Uri 'http://localhost:8087/api/resources' -Headers @{ Authorization = "Bearer $adminToken" } -ContentType 'application/json' -Body $createBody
  if (-not $created.id) { throw 'Create resource failed' }

  $updateBody = @{
    title = $created.title + ' Updated'
    description = $created.description
    url = $created.url
    type = $created.type
    level = 'INTERMEDIATE'
    industry = $created.industry
    thumbUrl = $created.thumbUrl
    categoryId = $created.categoryId
  } | ConvertTo-Json

  $updated = Invoke-RestMethod -Method Put -Uri ("http://localhost:8087/api/resources/$($created.id)") -Headers @{ Authorization = "Bearer $adminToken" } -ContentType 'application/json' -Body $updateBody
  if ($updated.level -ne 'INTERMEDIATE') { throw 'Update resource failed' }

  Invoke-RestMethod -Method Delete -Uri ("http://localhost:8087/api/resources/$($created.id)") -Headers @{ Authorization = "Bearer $adminToken" } | Out-Null
  Write-Host "[OK] CRUD test passed (create/update/delete)" -ForegroundColor Green

  Write-Host "`n=================================" -ForegroundColor Green
  Write-Host "VALIDATION SMOKE TEST: PASSED" -ForegroundColor Green
  Write-Host "=================================" -ForegroundColor Green
  exit 0
}
catch {
  Write-Host "[ERR] $($_.Exception.Message)" -ForegroundColor Red
  Write-Host "`n=================================" -ForegroundColor Red
  Write-Host "VALIDATION SMOKE TEST: FAILED" -ForegroundColor Red
  Write-Host "=================================" -ForegroundColor Red
  exit 1
}
