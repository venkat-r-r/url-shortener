const mysql = require ('mysql');
const dbConfig = require ('../data/config').dbConfig;
const Logger = require ('../utilities/logger').Logger;

const log = new Logger ('connection.js');
const conn = mysql.createConnection (dbConfig);

conn.connect ((err) => {

    const prefix = 'conn.connect ()';
    if (err) {
        log.error (prefix, `Unable to connect - ${err.toString ()}`);
    } else {
        log.info (prefix, 'Connected to database');
    }
});

module.exports = conn;
