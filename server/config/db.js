const { Pool } = require("pg");
require("dotenv").config(); // ✅ Load environment variables

// ✅ Determine SSL settings dynamically
const sslConfig = process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || null,
  user: process.env.DB_USER || "default_user",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "default_db",
  password: process.env.DB_PASS || "default_pass",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  ssl: sslConfig,
});

// ✅ Log database connection settings for debugging
console.log("Database Config:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  ssl: sslConfig,
});

pool.connect()
  .then(() => console.log("- ✅ Connected to PostgreSQL"))
  .catch((err) => {
    console.error("- ❌ Database connection error:", err.message);
    process.exit(1); // Exit process on database connection failure
  });

module.exports = pool;