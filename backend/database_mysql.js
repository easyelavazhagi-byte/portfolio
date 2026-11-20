/**
 * MySQL / MySQL2 Alternative Configuration
 * -------------------------------------------------------------
 * To use MySQL instead of SQLite:
 * 1. Install mysql2: npm install mysql2
 * 2. Set DB credentials (HOST, USER, PASSWORD, DATABASE)
 * 3. Run the schema migrations below.
 */

/*
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function initMySQL() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      long_description TEXT,
      tags JSON,
      features JSON,
      demo_type VARCHAR(50) DEFAULT 'modal',
      live_demo VARCHAR(255),
      github_url VARCHAR(255),
      featured INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255),
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

module.exports = { pool, initMySQL };
*/
