const { Pool } = require("pg");
require("dotenv").config(); // ✅ Only call once

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || null,
  user: process.env.DB_USER || "default_user",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "default_db",
  password: process.env.DB_PASS || "default_pass",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// ✅ Check if environment variables are loaded
console.log("- Database Connected ✅");


pool.connect()
  .then(() => console.log("- Connected to PostgreSQL ✅"))
  .catch((err) => console.error("❌ Database connection error:", err.message));

module.exports = pool;
