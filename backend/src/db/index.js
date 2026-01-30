const { Pool } = require('pg');
const sqlite = require('./sqlite');

function convertPlaceholders(sql) {
  // Replace '?' with $1, $2... for pg
  let i = 0;
  return sql.replace(/\?/g, () => {
    i += 1;
    return `$${i}`;
  });
}

let mode = 'sqlite';
let pgPool = null;

if (process.env.DATABASE_URL) {
  try {
    pgPool = new Pool({ connectionString: process.env.DATABASE_URL });
    mode = 'pg';
    console.log('DB: Using PostgreSQL via DATABASE_URL');
  } catch (err) {
    console.warn('DB: Could not initialize Postgres pool, falling back to SQLite', err.message);
  }
} else {
  console.log('DB: Using SQLite local database');
}

const sqliteDbPromise = sqlite.getDb;

async function run(sql, ...params) {
  if (mode === 'pg' && pgPool) {
    const q = convertPlaceholders(sql);
    const res = await pgPool.query(q, params);
    return { lastID: res.rows[0]?.id || null, rows: res.rows, rowCount: res.rowCount };
  }
  const db = await sqliteDbPromise();
  return db.run(sql, ...params);
}

async function get(sql, ...params) {
  if (mode === 'pg' && pgPool) {
    const q = convertPlaceholders(sql);
    const res = await pgPool.query(q, params);
    return res.rows[0] || null;
  }
  const db = await sqliteDbPromise();
  return db.get(sql, ...params);
}

async function all(sql, ...params) {
  if (mode === 'pg' && pgPool) {
    const q = convertPlaceholders(sql);
    const res = await pgPool.query(q, params);
    return res.rows || [];
  }
  const db = await sqliteDbPromise();
  return db.all(sql, ...params);
}

async function close() {
  if (mode === 'pg' && pgPool) {
    await pgPool.end();
  } else {
    const db = await sqliteDbPromise();
    await db.close();
  }
}

module.exports = { run, get, all, close, mode };
