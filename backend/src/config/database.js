import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("sslmode=require") || process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
});

pool.on("connect", () => {
  // Connected successfully
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error on idle client:", err);
});

export const query = (text, params) => pool.query(text, params);
export default pool;
