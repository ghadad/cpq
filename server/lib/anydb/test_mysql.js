let mysql = require('mysql');
const config = require("../../config/development")

let connection = mysql.createConnection(config.dbs.mysql.connection);

let sql = `SELECT 1 FROM dual`;

connection.query(sql, (error, results, fields) => {
  if (error) {
    return console.error("ERROR:",error.message);
  }
  console.log(results);
  connection.end(); 
});

