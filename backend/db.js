import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'productivity_app', // 👈 Changed this to match your real database name!
  password: 'Prersan1234',           // Double check that this password is correct for your postgres user
  port: 5432,
});

console.log("🔌 PostgreSQL Connection Pool initialized successfully.");