const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'mysql.railway.internal,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'LNNExntdHlbDSNuSvrlayPcrAwBrOQmw',
  database: process.env.DB_NAME || 'railway',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
