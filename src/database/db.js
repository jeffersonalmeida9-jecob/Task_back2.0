const { Pool } = require('pg');

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
    SSL: { rejectUnauthorized: false },
});

module.exports = pool