const mysql = require("mysql");
const dbConfig = require('../data/config').dbConfig;


const conn = mysql.createConnection(dbConfig);

conn.connect ((err) => {
  if (err) {
    console.log ('Failed to connect to database', err);
  }
  else {
    console.log ('Connected to database');
  }
})

module.exports = conn;