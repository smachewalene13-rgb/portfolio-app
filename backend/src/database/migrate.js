import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runMigrations() {
  console.log("⏳ Running database schema migrations...");
  try {
    const schemaPath = path.join(__dirname, "schema.sql");
    const sql = fs.readFileSync(schemaPath, "utf8");

    await pool.query(sql);
    console.log("✅ Database schema migrated successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runMigrations()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
