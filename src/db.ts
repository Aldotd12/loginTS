import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'your_host',
  user: 'your_user',
  password: 'your_password',
  database: 'your_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;