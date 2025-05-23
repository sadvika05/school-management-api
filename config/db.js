const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',  // Host provided
  user: 'sql12780823',               // Database user
  password: '4rvTHhMipP',           // Database password
  database: 'sql12780823',           // Database name
  port: 3306                        // Port number
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }else{
  console.log('Connected to MySQL Database');
}
});

module.exports = db;
