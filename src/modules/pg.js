const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.MY_DATABASE_URL,
  ssl: process.env.PG_SSL_ON || false
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
