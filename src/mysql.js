const mysql = require("mysql");
const {dbHost, dbPort, dbUser, dbPassword, dbName} = require('./data/config')


const conn = mysql.createConnection({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPassword,
  database: dbName
});

module.exports = {conn};