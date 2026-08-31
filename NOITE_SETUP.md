# Bratva Outlet V2 - Setup Noite (Notebook)

## Primeiro acesso (primeira vez):

```bash
git clone https://github.com/bratvaoutlet-tech/bratva-outlet-v2.git
cd bratva-outlet-v2
npm install
cp .env.example .env
# Preenche .env com:
# VITE_SUPABASE_URL=https://seu-projeto.supabase.co
# VITE_SUPABASE_ANON_KEY=sua-chave-aqui
npm run dev
```

## Acessos:

- **Loja:** http://localhost:5173
- **Admin:** http://localhost:5173/admin (precisa login)
- **Login:** http://localhost:5173/login

## Criar conta teste:

1. Clica "Sign up"
2. Email: `teste@bratva.com`
3. Password: `123456`
4. Verifica email (Supabase envia)
5. Faz login

## Schema SQL:

Já está em `schema.sql`. Roda no Supabase SQL Editor:
1. Supabase dashboard → SQL Editor → New query
2. Copia/cola `schema.sql`
3. Clica Run

## Próximas tarefas:

- [ ] Testar fluxo completo (produto → carrinho → checkout)
- [ ] Criar 5 produtos fake no admin
- [ ] Testar login/signup
- [ ] Testar checkout mock
- [ ] Printscreen tudo pra me mandar

## Se der erro:

- `npm install` novamente
- Verifica `.env` (credenciais Supabase corretas)
- Limpa cache: `rm -rf node_modules .next` + `npm install`
