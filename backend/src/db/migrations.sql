-- ============================================
-- MIGRATIONS - BANCO DE DADOS LEIDY CLEANER
-- ============================================

-- TABELA: users
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'client' CHECK(role IN ('client', 'admin', 'staff')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: services
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration INTEGER DEFAULT 60,
  category TEXT,
  active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: bookings
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  service_id INTEGER NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  price DECIMAL(10,2),
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (service_id) REFERENCES services(id)
);

-- TABELA: payments
CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_id INTEGER NOT NULL UNIQUE,
  amount DECIMAL(10,2) NOT NULL,
  method TEXT DEFAULT 'stripe' CHECK(method IN ('stripe', 'pix', 'cash')),
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'completed', 'failed')),
  stripe_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- ÍNDICES PARA PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- SEED: Serviços padrão
INSERT OR IGNORE INTO services (name, description, price, duration, category) VALUES
('Limpeza Básica', 'Limpeza geral da residência', 150.00, 120, 'residencial'),
('Limpeza Profunda', 'Limpeza completa com detalhes', 250.00, 180, 'residencial'),
('Limpeza Pós-Reforma', 'Limpeza especializada pós-obra', 500.00, 240, 'comercial'),
('Limpeza de Escritório', 'Limpeza de ambiente comercial', 200.00, 90, 'comercial'),
('Limpeza de Vidros', 'Serviço especializado em janelas', 100.00, 60, 'especializado'),
('Higienização de Estofados', 'Limpeza de móveis estofados', 150.00, 120, 'especializado');

-- SEED: Usuário admin padrão (senha: admin123 - será hashada na prática)
INSERT OR IGNORE INTO users (email, password, name, phone, role) VALUES
('admin@leidycleaner.com', '$2b$10$placeholder', 'Administrador', '5198030000', 'admin');
