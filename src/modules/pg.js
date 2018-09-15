const pg = require('pg');
pg.defaults.ssl = process.env.PG_SSL_ON || false;

module.exports = pg;

 