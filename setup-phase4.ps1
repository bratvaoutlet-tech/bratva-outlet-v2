$dirs = @("app/produtos", "app/produtos/[id]", "app/auth/login", "app/auth/signup", "app/admin/produtos/novo", "app/carrinho", "app/checkout", "app/pedido/[id]")

foreach ($dir in $dirs) {
  if (-not (Test-Path $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
  }
}

Write-Host "Diretórios criados!"
