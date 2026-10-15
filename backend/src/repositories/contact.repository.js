import pool from "../config/database.js";

function formatMessage(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    subject: row.subject,
    message: row.message,
    content: row.message, // backwards compatibility with existing frontend
    isRead: row.is_read,
    is_read: row.is_read,
    createdAt: row.created_at,
  };
}

export const contactRepository = {
  async findAll() {
    const res = await pool.query(
      "SELECT * FROM contact_messages ORDER BY created_at DESC"
    );
    return res.rows.map(formatMessage);
  },

  async findById(id) {
    const res = await pool.query("SELECT * FROM contact_messages WHERE id = $1", [id]);
    return formatMessage(res.rows[0]);
  },

  async create({ name, email, subject, message, content }) {
    const textContent = message || content;
    const res = await pool.query(
      `INSERT INTO contact_messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, subject || null, textContent]
    );
    return formatMessage(res.rows[0]);
  },

  async markAsRead(id, isRead = true) {
    const res = await pool.query(
      "UPDATE contact_messages SET is_read = $1 WHERE id = $2 RETURNING *",
      [isRead, id]
    );
    return formatMessage(res.rows[0]);
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM contact_messages WHERE id = $1 RETURNING id", [id]);
    return res.rowCount > 0;
  },
};
