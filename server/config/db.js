const { Pool } = require("pg");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";
const sslEnabled = isProduction && process.env.DATABASE_URL ? { rejectUnauthorized: false } : false;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: sslEnabled,
});

console.log("Database Config:", {
  connectionString: process.env.DATABASE_URL ? "✓ Set" : "✗ Not Set",
  ssl: sslEnabled ? "Enabled" : "Disabled",
});

pool.connect()
  .then(() => console.log("- ✅ Connected to PostgreSQL"))
  .catch((err) => {
    console.error("- ❌ Database connection error:", err.message);
    process.exit(1); // Prevent server from running without DB connection
  });

module.exports = pool;
