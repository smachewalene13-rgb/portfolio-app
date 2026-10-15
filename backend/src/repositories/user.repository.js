import pool from "../config/database.js";

export const userRepository = {
  async findByEmail(email) {
    const res = await pool.query(
      "SELECT id, email, password_hash, name, created_at FROM admin_users WHERE email = $1",
      [email]
    );
    return res.rows[0] || null;
  },

  async findById(id) {
    const res = await pool.query(
      "SELECT id, email, name, created_at FROM admin_users WHERE id = $1",
      [id]
    );
    return res.rows[0] || null;
  },

  async create({ email, passwordHash, name }) {
    const res = await pool.query(
      "INSERT INTO admin_users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at",
      [email, passwordHash, name]
    );
    return res.rows[0];
  },

  async updatePassword(id, passwordHash) {
    const res = await pool.query(
      "UPDATE admin_users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, email, name",
      [passwordHash, id]
    );
    return res.rows[0] || null;
  },
};
