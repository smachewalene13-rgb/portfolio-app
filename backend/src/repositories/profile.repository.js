import pool from "../config/database.js";

export const profileRepository = {
  async getProfile() {
    const res = await pool.query("SELECT * FROM profile ORDER BY id ASC LIMIT 1");
    return res.rows[0] || null;
  },

  async updateProfile(data) {
    const fields = [];
    const values = [];
    let idx = 1;

    const allowed = [
      "name",
      "title",
      "bio",
      "about_details",
      "email",
      "location",
      "avatar_url",
      "resume_url",
      "github_url",
      "linkedin_url",
      "twitter_url",
    ];

    for (const key of allowed) {
      if (data[key] !== undefined) {
        fields.push(`${key} = $${idx}`);
        values.push(data[key]);
        idx++;
      }
    }

    if (fields.length === 0) {
      return this.getProfile();
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);

    // If profile exists, update; else insert
    const existing = await this.getProfile();
    if (existing) {
      values.push(existing.id);
      const query = `UPDATE profile SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;
      const res = await pool.query(query, values);
      return res.rows[0];
    } else {
      const keys = Object.keys(data).filter((k) => allowed.includes(k));
      const vals = keys.map((k) => data[k]);
      const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
      const query = `INSERT INTO profile (${keys.join(", ")}) VALUES (${placeholders}) RETURNING *`;
      const res = await pool.query(query, vals);
      return res.rows[0];
    }
  },
};
