$selectedNum = Read-Host '1.client 2.admin 3.status'

Switch ($selectedNum) { 1{ $dev = "client" } 2{ $dev = "admin" } 3{ $dev = "status" } }

$devEnv = @"
service=$dev
"@

$devEnv | Set-Content .\.env

Invoke-Expression 'npm start'