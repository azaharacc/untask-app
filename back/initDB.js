require('dotenv').config();
const pool = require('./db');

const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("✅ Users table created successfully.");
  } catch (error) {
    console.error("❌ Error creating users table:", error);
  } finally {
    await pool.end();
  }
};

createUsersTable();
