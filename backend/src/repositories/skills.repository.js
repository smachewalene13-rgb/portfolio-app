import pool from "../config/database.js";

export const skillsRepository = {
  async findAll() {
    const res = await pool.query(
      "SELECT id, name, category, level, display_order FROM skills ORDER BY display_order ASC, name ASC"
    );
    return res.rows;
  },

  async findById(id) {
    const res = await pool.query("SELECT * FROM skills WHERE id = $1", [id]);
    return res.rows[0] || null;
  },

  async create({ name, category, level = 1, display_order = 0 }) {
    const res = await pool.query(
      "INSERT INTO skills (name, category, level, display_order) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, category, level, display_order]
    );
    return res.rows[0];
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    let idx = 1;

    const map = {
      name: "name",
      category: "category",
      level: "level",
      display_order: "display_order",
      displayOrder: "display_order",
    };

    const handledCols = new Set();
    for (const [key, col] of Object.entries(map)) {
      if (data[key] !== undefined && !handledCols.has(col)) {
        fields.push(`${col} = $${idx++}`);
        values.push(data[key]);
        handledCols.add(col);
      }
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push("updated_at = CURRENT_TIMESTAMP");
    values.push(id);

    const res = await pool.query(
      `UPDATE skills SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`,
      values
    );
    return res.rows[0] || null;
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM skills WHERE id = $1 RETURNING id", [id]);
    return res.rowCount > 0;
  },
};
