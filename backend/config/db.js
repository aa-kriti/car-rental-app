const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'car_rental',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.code, err.sqlMessage || err.message);
    if (err.code === 'ER_BAD_DB_ERROR') {
      console.log('Database does not exist. Please create it using phpMyAdmin');
    }
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.log('Database has too many connections.');
    }
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('Database access denied. Check your credentials in .env');
    }
    return;
  }
  console.log('✓ Connected to MySQL database');
});

connection.on('error', (err) => {
  console.log('db error', err.code);
});

module.exports = connection;

