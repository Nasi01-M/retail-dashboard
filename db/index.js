const { Pool } = require('pg');
require('dotenv').config();

//  Connect to PostgreSQL using env vars
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Check DB status on startup
(async () => {
  try {
    const info = await pool.query('SELECT current_database(), current_user');
    const count = await pool.query('SELECT COUNT(*) FROM public.products');

    console.log('Connected to:', info.rows[0]);
    console.log(`Products table rows: ${count.rows[0].count}`);
  } catch (err) {
    console.error('DB connection failed:', err);
  }
})();

module.exports = pool;
