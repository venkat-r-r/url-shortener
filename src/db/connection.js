const mysql = require ('mysql2/promise');
const dbConfig = require ('../data/config').dbConfig;
const Logger = require ('../utilities/logger').Logger;

const log = new Logger ('connection.js');

async function initPoolWithRetry(config, retries = 10, delayMs = 5000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const pool = mysql.createPool(config);
      // Simple "SELECT 1" to confirm connection works
      await pool.query('SELECT 1');
      console.log(`DB connected on attempt ${attempt}`);
      return pool;
    } catch (err) {
      console.error(`DB connection failed (attempt ${attempt}): ${err.message}`);
      if (attempt === retries) throw err;
      await new Promise(res => setTimeout(res, delayMs));
    }
  }
}

const poolPromise = initPoolWithRetry({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = poolPromise;
