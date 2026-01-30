# 🚀 GUIA DE DEPLOY EM PRODUÇÃO - LEIDY CLEANER

## 📊 Estado Atual do Projeto

| Componente | Status | Observações |
|-----------|--------|------------|
| Frontend (Next.js) | ✅ Pronto | Build compilado, todas as páginas funcionando |
| Backend (Express) | ⚠️ Estrutura OK | Pronto, falta conectar BD |
| Banco de Dados | ✅ Estrutura | Schema criado, pronto para Supabase |
| Segurança | ✅ Implementada | Bcrypt + JWT com expiração |
| Validações | ✅ Implementadas | Email, Phone, CEP, Datas |
| Integrações | ✅ Prontas | WhatsApp (Twilio) com fallback MOCK |
| Error Handling | ✅ Completo | Mensagens claras ao usuário |

---

## 💰 OPÇÃO 1: HOSPEDAGEM GRATUITA (~R$0/mês)

### Frontend: Vercel ✅
```bash
# 1. Push para GitHub
git push origin main

# 2. Conectar Vercel
# Ir para https://vercel.com/new
# Selecionar repositório GitHub
# Deploy automático! 🎉
```

**Resultado**: Seu site em `seu-projeto.vercel.app`

---

### Backend: Railway ✅
```bash
# 1. Criar conta em railway.app
# 2. Conectar GitHub
# 3. Criar novo projeto → Node.js

# Railway detecta automaticamente package.json
# Define ENVIRONMENT = production
# Deploy pronto!
```

**Resultado**: API em `seu-projeto.up.railway.app`

---

### Banco de Dados: Supabase ✅
```bash
# 1. Ir para https://supabase.com
# 2. Criar novo projeto (grátis!)
# 3. Ir para SQL Editor
# 4. Copiar e executar migrations:
```

```sql
-- Criar tabela users
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'client',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela bookings
CREATE TABLE bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  service_type TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  address TEXT NOT NULL,
  price DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Criar tabela services
CREATE TABLE services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration INTEGER,
  category TEXT,
  active BOOLEAN DEFAULT 1
);
```

**Resultado**: BD em Supabase (grátis, com 500MB)

---

## 🔧 CONFIGURAÇÃO PARA PRODUÇÃO

### 1. Variáveis de Ambiente

**Frontend** (Vercel):
```env
# Ir para Settings → Environment Variables
NEXT_PUBLIC_API_URL=https://seu-backend.up.railway.app
```

**Backend** (Railway):
```env
# Ir para Variables no Railway
NODE_ENV=production
JWT_SECRET=use-a-senha-forte-aqui
JWT_REFRESH_SECRET=outra-senha-forte
DATABASE_URL=postgresql://user:password@seu-db.supabase.co:5432/postgres
TWILIO_SID=seu-twilio-sid
TWILIO_TOKEN=seu-twilio-token
TWILIO_WHATSAPP_NUMBER=+55xx999999999
PORT=3001
```

### 2. Conectar Backend ao Supabase

**Arquivo**: `backend/src/db/supabase.js`

```javascript
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = supabase;
```

### 3. Atualizar ConnectionString

**Arquivo**: `backend/src/middleware/auth.js`
```javascript
// Mudar de SQLite para Supabase
const supabase = require('../db/supabase');

// Exemplo: buscar user
const user = await supabase
  .from('users')
  .select('*')
  .eq('email', email)
  .single();
```

---

## 📋 CHECKLIST DE DEPLOY

### ✅ Pré-Deploy (Fazer Agora)
- [ ] Instalar dependências: `npm install bcrypt jsonwebtoken twilio`
- [ ] Criar `.env` com variáveis do ambiente
- [ ] Testar localmente: `npm run dev` (frontend e backend)
- [ ] Push para GitHub: `git push origin main`

### ✅ Deploy Frontend (Vercel)
- [ ] Conta Vercel criada
- [ ] GitHub conectado
- [ ] Projeto importado
- [ ] Deploy automático funcionando
- [ ] Verificar site em `seu-projeto.vercel.app`

### ✅ Deploy Backend (Railway)
- [ ] Conta Railway criada
- [ ] Projeto criado
- [ ] GitHub conectado
- [ ] Environment variables configuradas
- [ ] Verificar API em `seu-backend.up.railway.app`

### ✅ Deploy Banco (Supabase)
- [ ] Conta Supabase criada
- [ ] Projeto criado
- [ ] SQL migrations executadas
- [ ] Tables: users, bookings, services criadas
- [ ] Connection string copiada

### ✅ Conectar Tudo
- [ ] Frontend aponta para backend correto
- [ ] Backend aponta para Supabase correto
- [ ] Testar fluxo completo: agendar → salvar → exibir
- [ ] WhatsApp testado (modo mock OK)

---

## 🧪 TESTE RÁPIDO

### 1. Testar Frontend
```bash
cd frontend
npm run build
npm start
# Abrir: http://localhost:3000
```

### 2. Testar Backend
```bash
cd backend
npm start
# Fazer request: curl http://localhost:3001/api/services
```

### 3. Testar Banco
```bash
# Verificar conexão Supabase
curl -H "Authorization: Bearer YOUR_ANON_KEY" \
  https://seu-db.supabase.co/rest/v1/users
```

---

## 💡 PRÓXIMOS PASSOS

### Fase 1: MVP (1-2 dias)
- ✅ Fazer deploy em produção
- ✅ Testar agendamento básico
- ✅ Ajustar validações conforme feedback

### Fase 2: Monetização (1 semana)
- ⏳ Integrar Stripe para pagamentos
- ⏳ Dashboard do admin completo
- ⏳ Relatórios de faturamento

### Fase 3: Escalabilidade (2-3 semanas)
- ⏳ Cache com Redis
- ⏳ Fila de jobs com Bull
- ⏳ Notificações em tempo real (Socket.io)

---

## 🆘 TROUBLESHOOTING

| Problema | Solução |
|----------|---------|
| "API não responde" | Verificar se Railway está ligado e variáveis corretas |
| "Banco não conecta" | Testar connection string Supabase, verificar firewall |
| "Vite/Next não builda" | `rm -rf node_modules` e `npm install` |
| "Erro 500 no backend" | Verificar logs em Railway → Deployments → Logs |
| "CORS error" | Adicionar `origin` no express: `app.use(cors({ origin: 'seu-frontend.vercel.app' }))` |

---

## 📞 SUPORTE

Caso tenha dúvidas:
1. Verificar logs do Railway: `railway logs`
2. Verificar build Vercel: Dashboard → Deployments
3. Testar endpoint localmente antes de fazer deploy
4. Conferir se totas variáveis de ambiente estão corretas

---

**Estimativa**: 30 minutos para Deploy Completo! 🎉

---

*Última atualização: 30/01/2026*
