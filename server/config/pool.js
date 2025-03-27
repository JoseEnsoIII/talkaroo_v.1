const { Pool } = require("pg");

const pool = new Pool({
  user: "your_user",
  host: "your_host",
  database: "your_database",
  password: "your_password",
  port: 5432, // Default PostgreSQL port
  client_encoding: 'UTF8',
});

module.exports = pool;
