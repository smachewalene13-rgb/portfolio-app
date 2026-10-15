import pool from "../config/database.js";

export const educationRepository = {
  async findAll() {
    const res = await pool.query(
      "SELECT * FROM education ORDER BY display_order ASC, start_date DESC"
    );
    return res.rows;
  },

  async findById(id) {
    const res = await pool.query("SELECT * FROM education WHERE id = $1", [id]);
    return res.rows[0] || null;
  },

  async create(data) {
    const achievements = Array.isArray(data.achievements) ? data.achievements : [];
    const displayOrder = data.display_order || data.displayOrder || 0;

    const res = await pool.query(
      `INSERT INTO education (institution, qualification, field_of_study, start_date, end_date, description, achievements, display_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        data.institution,
        data.qualification,
        data.fieldOfStudy || data.field_of_study || null,
        data.startDate || data.start_date,
        data.endDate || data.end_date || null,
        data.description || null,
        achievements,
        displayOrder,
      ]
    );
    return res.rows[0];
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    let idx = 1;

    const map = {
      institution: "institution",
      qualification: "qualification",
      field_of_study: "field_of_study",
      fieldOfStudy: "field_of_study",
      start_date: "start_date",
      startDate: "start_date",
      end_date: "end_date",
      endDate: "end_date",
      description: "description",
      achievements: "achievements",
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
      `UPDATE education SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`,
      values
    );
    return res.rows[0] || null;
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM education WHERE id = $1 RETURNING id", [id]);
    return res.rowCount > 0;
  },
};
