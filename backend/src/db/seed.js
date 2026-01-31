const bcrypt = require('bcryptjs');
const db = require('./index');

async function runSeed() {
  try {
    console.log('🌱 Iniciando seed de dados...');

    // ADMIN
    const adminPass = await bcrypt.hash('admin123', 10);
    await db.run(
      `INSERT OR IGNORE INTO users (name, email, password, phone, role) 
       VALUES (?, ?, ?, ?, ?)`,
      'Admin Leidy',
      'admin@leidy.com',
      adminPass,
      '11999999999',
      'admin'
    );

    // STAFF
    const staffPass = await bcrypt.hash('staff123', 10);
    await db.run(
      `INSERT OR IGNORE INTO users (name, email, password, phone, role) 
       VALUES (?, ?, ?, ?, ?)`,
      'Maria Silva',
      'maria@leidy.com',
      staffPass,
      '11988888888',
      'staff'
    );

    // CLIENTE
    const clientPass = await bcrypt.hash('client123', 10);
    await db.run(
      `INSERT OR IGNORE INTO users (name, email, password, phone, role) 
       VALUES (?, ?, ?, ?, ?)`,
      'João Cliente',
      'joao@email.com',
      clientPass,
      '11985555555',
      'client'
    );

    // SERVIÇOS
    await db.run(
      `INSERT OR IGNORE INTO services (name, description, duration) 
       VALUES (?, ?, ?)`,
      'Limpeza Rápida',
      '2-3 horas, ambiente pequeno',
      180
    );

    await db.run(
      `INSERT OR IGNORE INTO services (name, description, duration) 
       VALUES (?, ?, ?)`,
      'Limpeza Completa',
      '4-5 horas, ambiente inteiro',
      300
    );

    console.log('✅ Seed executado com sucesso!');
    console.log('👤 Admin: admin@leidy.com / admin123');
    console.log('👥 Staff: maria@leidy.com / staff123');
    console.log('🧑 Cliente: joao@email.com / client123');
  } catch (error) {
    console.error('❌ Erro ao executar seed:', error.message);
  }
}

if (require.main === module) runSeed().catch(err => { console.error(err); process.exit(1); });

module.exports = runSeed;
