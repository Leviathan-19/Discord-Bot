const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl: { rejectUnauthorized: false }
});

pool.connect()
  .then(() => console.log('🟢 Base de datos conectada'))
  .catch(err => console.error('🔴 Error DB:', err));

module.exports = pool;