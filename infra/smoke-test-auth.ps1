$ErrorActionPreference='Stop'
$baseKeycloak='http://localhost:8090'
$baseUser='http://localhost:8081'
$baseResource='http://localhost:8087'
$realm='myapp-realm'
$clientId='angular-client'

function Tok($u,$p){
  (Invoke-RestMethod -Method Post -Uri "$baseKeycloak/realms/$realm/protocol/openid-connect/token" -ContentType 'application/x-www-form-urlencoded' -Body "client_id=$clientId&grant_type=password&username=$u&password=$p").access_token
}

function Status([scriptblock]$a){
  try { & $a | Out-Null; return 200 }
  catch {
    if ($_.Exception.Response) { return [int]$_.Exception.Response.StatusCode.value__ }
    throw
  }
}

$adminToken=Tok 'adminyosr@test.com' '0000'
$managerToken=Tok 'useryosr@test.com' '0000'
$userToken=Tok 'user@test.com' '0000'

$managerMe=Invoke-RestMethod -Method Get -Uri "$baseUser/api/users/me" -Headers @{Authorization="Bearer $managerToken"}
Invoke-RestMethod -Method Patch -Uri "$baseUser/api/users/$($managerMe.id)/role?role=MANAGER" -Headers @{Authorization="Bearer $adminToken"} | Out-Null

$public=Status { Invoke-RestMethod -Method Get -Uri "$baseResource/api/resources?page=0&size=3" }
$anonBookmarks=Status { Invoke-RestMethod -Method Get -Uri "$baseResource/api/resources/bookmarks" }

$catBody=@{name="SmokeA-$(Get-Random)";description='a';industry='TECHNOLOGY'} | ConvertTo-Json -Compress
$cat=Invoke-RestMethod -Method Post -Uri "$baseResource/api/resources/categories" -Headers @{Authorization="Bearer $adminToken"} -ContentType 'application/json' -Body $catBody

$resBody=@{title='Smoke Resource';description='a';url="https://example.com/smoke-$(Get-Random)";type='ARTICLE';level='BEGINNER';industry='TECHNOLOGY';thumbUrl='https://example.com/t.png';categoryId="$($cat.id)"} | ConvertTo-Json -Compress
$res=Invoke-RestMethod -Method Post -Uri "$baseResource/api/resources" -Headers @{Authorization="Bearer $adminToken"} -ContentType 'application/json' -Body $resBody

$managerCreate=Status {
  Invoke-RestMethod -Method Post -Uri "$baseResource/api/resources/categories" -Headers @{Authorization="Bearer $managerToken"} -ContentType 'application/json' -Body (@{name="SmokeM-$(Get-Random)";description='m';industry='TECHNOLOGY'} | ConvertTo-Json -Compress)
}

$userBookmark=Status { Invoke-RestMethod -Method Post -Uri "$baseResource/api/resources/bookmarks/$($res.id)" -Headers @{Authorization="Bearer $userToken"} }
$userDelete=Status { Invoke-RestMethod -Method Delete -Uri "$baseResource/api/resources/$($res.id)" -Headers @{Authorization="Bearer $userToken"} }

Write-Output "PUBLIC_LIST=$public"
Write-Output "ANON_BOOKMARKS=$anonBookmarks"
Write-Output "MANAGER_CREATE_CATEGORY=$managerCreate"
Write-Output "USER_BOOKMARK=$userBookmark"
Write-Output "USER_DELETE_RESOURCE=$userDelete"

$pass = ($public -eq 200) -and ($anonBookmarks -eq 401) -and (($managerCreate -eq 200) -or ($managerCreate -eq 201)) -and (($userBookmark -eq 200) -or ($userBookmark -eq 201)) -and ($userDelete -eq 403)
if($pass){ Write-Output 'SMOKE_TEST=PASS' } else { Write-Output 'SMOKE_TEST=FAIL' }
Write-Output "RESOURCE_ID=$($res.id)"
Write-Output "MANAGER_USER_ID=$($managerMe.id)"
