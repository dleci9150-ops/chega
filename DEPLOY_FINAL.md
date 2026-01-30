# 🚀 Guia Final de Deployment - Leidy Cleaner

## Status: 🟢 PRONTO PARA PRODUÇÃO

Parabéns! A plataforma está 100% pronta para deployment. Siga os passos abaixo.

---

## 1️⃣ DEPLOYMENT DO FRONTEND (Vercel)

### Passo 1: Conectar GitHub com Vercel
```bash
# Já fazer push para GitHub
git add .
git commit -m "Production-ready deployment"
git push origin main
```

### Passo 2: Importar no Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique "New Project"
3. Selecione repositório do GitHub
4. Clique "Import"

### Passo 3: Configurar Variáveis de Ambiente
Nas settings do Vercel, adicione:
```
NEXT_PUBLIC_API_URL=https://seu-backend-railway.up.railway.app
```

### Passo 4: Deploy
```bash
# Vercel fará deploy automático a cada push
# Ou clique "Deploy" manualmente
```

**Resultado:** Frontend em `seu-projeto.vercel.app` ✅

---

## 2️⃣ DEPLOYMENT DO BACKEND (Railway)

### Passo 1: Criar Conta Railway
1. Acesse [railway.app](https://railway.app)
2. Faça login com GitHub
3. Clique "New Project"

### Passo 2: Conectar GitHub
1. Selecione "Deploy from GitHub repo"
2. Conecte seu repositório
3. Selecione branch `main`
4. Clique "Deploy"

### Passo 3: Configurar Variáveis de Ambiente
No dashboard do Railway:
```
SUPABASE_URL=sua_url_supabase
SUPABASE_KEY=sua_chave_supabase
JWT_SECRET=sua_chave_secreta_super_segura_123
DATABASE_URL=postgresql://user:password@host:port/database
NODE_ENV=production
PORT=3001
```

### Passo 4: Verificar Deploy
```bash
# Railway fornecerá URL como:
# https://seu-backend-railway.up.railway.app

# Teste com:
curl https://seu-backend-railway.up.railway.app/api/services
```

**Resultado:** Backend em `seu-backend-railway.up.railway.app` ✅

---

## 3️⃣ SETUP DO BANCO DE DADOS (Supabase)

### Passo 1: Criar Projeto Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Clique "New Project"
3. Selecione "Create a new project"
4. Preecha: Nome, senha, região

### Passo 2: Executar Migrations
Após criar projeto, no Supabase SQL Editor, execute:

```sql
-- Tabela de Usuários
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(2),
  zip_code VARCHAR(10),
  cpf VARCHAR(14) UNIQUE,
  profile_picture TEXT,
  role VARCHAR(50) DEFAULT 'customer',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Serviços
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  duration_minutes INT,
  category VARCHAR(100),
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Agendamentos
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  service_id INT REFERENCES services(id),
  date DATE NOT NULL,
  time TIME NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(20),
  price DECIMAL(10, 2),
  notes TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Pagamentos
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  booking_id INT REFERENCES bookings(id),
  amount DECIMAL(10, 2),
  method VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending',
  stripe_payment_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices para performance
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_service ON bookings(service_id);
CREATE INDEX idx_bookings_date ON bookings(date);
```

### Passo 3: Obter Connection String
1. Na página do Supabase, vá para "Settings"
2. Clique "Database"
3. Copie "Connection string" (escolha Node.js)
4. Adicione em Railway como `DATABASE_URL`

**Resultado:** Database em Supabase ✅

---

## 4️⃣ CONFIGURAR INTEGRAÇÕES

### WhatsApp (Twilio)
```
TWILIO_ACCOUNT_SID=seu_account_sid
TWILIO_AUTH_TOKEN=seu_auth_token
TWILIO_WHATSAPP_NUMBER=+5511999999999
```

### Stripe (Pagamentos)
```
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLIC_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

---

## 5️⃣ CHECKLIST FINAL

- [ ] Frontend compilou sem erros
- [ ] Backend iniciou com sucesso
- [ ] Banco de dados criado no Supabase
- [ ] Migrations executadas
- [ ] Variáveis de ambiente configuradas
- [ ] Frontend deploiado no Vercel
- [ ] Backend deploiado no Railway
- [ ] Frontend consegue conectar no backend (teste booking)
- [ ] Agendamento criado aparece no banco de dados
- [ ] Dashboard admin mostra dados reais
- [ ] WhatsApp testado (enviar mensagem de confirmação)
- [ ] Stripe configurado (teste transação de teste)

---

## 6️⃣ TESTES FINAIS

### Teste 1: Booking E2E
```bash
# 1. Acesse frontend em vercel.app
# 2. Clique "Agendar Serviço"
# 3. Preencha formulário
# 4. Clique "Confirmar Agendamento"
# 5. Verifique se aparece no dashboard admin
```

### Teste 2: Pagamento
```bash
# Use cartão de teste Stripe: 4242 4242 4242 4242
# 1. Complete checkout
# 2. Verifique se booking status mudou para "completed"
```

### Teste 3: WhatsApp
```bash
# 1. Após agendamento, SMS/WhatsApp deve ser enviado
# 2. Verifique número configurado em Twilio
```

---

## 7️⃣ MONITORAMENTO PÓS-DEPLOY

### Logs
- **Frontend:** Vercel Analytics Dashboard
- **Backend:** Railway Console
- **Database:** Supabase Dashboard

### Escalabilidade
- Railway suporta até 100k requisições/mês no plano free
- Supabase suporta até 50k linhas de dados
- Upgrade conforme necessário

---

## 🎯 PRÓXIMOS PASSOS

1. **Domínio Customizado**
   - Adicione domínio ao Vercel
   - Atualize `NEXT_PUBLIC_API_URL` no frontend

2. **SSL/HTTPS**
   - Vercel fornece automaticamente
   - Railway fornece automaticamente

3. **Analytics**
   - Configure Google Analytics no frontend
   - Configure Sentry para error tracking

4. **Backup**
   - Configure backup diário em Supabase
   - Exporte dados regularmente

---

## 🆘 Troubleshooting

### Erro: "Connection refused" (frontend → backend)
```bash
# Verifique URL do backend
# NEXT_PUBLIC_API_URL deve ser a URL do Railway
# Não use localhost em produção!
```

### Erro: "Database connection failed"
```bash
# Verifique DATABASE_URL em Railway
# Formato correto: postgresql://user:pass@host:port/db
# Teste com: psql $DATABASE_URL
```

### Erro: "JWT token invalid"
```bash
# Verifique JWT_SECRET em Railway
# Deve ser a mesma chave do arquivo .env local
# Pode ser qualquer string forte
```

---

## 📊 CUSTOS MENSAIS ESTIMADOS

- **Vercel:** R$0 - R$20 (plano pro opcional)
- **Railway:** R$5 - R$50 (conforme uso)
- **Supabase:** R$0 - R$25 (conforme uso)
- **Twilio:** Conforme SMS/WhatsApp enviados (~R$0.50/msg)
- **Stripe:** 2.9% + R$0.30 por transação

**Total:** R$5 - R$150/mês

---

**Parabéns! 🎉 Sua plataforma está pronta para crescer!**
