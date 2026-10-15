import pool from "../config/database.js";

function formatProject(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    image_url: row.image_url,
    liveUrl: row.live_url,
    live_url: row.live_url,
    repoUrl: row.repo_url,
    repo_url: row.repo_url,
    tags: Array.isArray(row.tags) ? row.tags : [],
    featured: row.featured,
    published: row.published,
    displayOrder: row.display_order,
    display_order: row.display_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const projectsRepository = {
  async findAll({ publishedOnly = false, featuredOnly = false } = {}) {
    const conditions = [];
    const values = [];
    let idx = 1;

    if (publishedOnly) {
      conditions.push(`published = $${idx++}`);
      values.push(true);
    }

    if (featuredOnly) {
      conditions.push(`featured = $${idx++}`);
      values.push(true);
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const query = `SELECT * FROM projects ${where} ORDER BY display_order ASC, created_at DESC`;
    const res = await pool.query(query, values);
    return res.rows.map(formatProject);
  },

  async findById(id) {
    const res = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
    return formatProject(res.rows[0]);
  },

  async create(data) {
    const imageUrl = data.imageUrl || data.image_url || null;
    const liveUrl = data.liveUrl || data.live_url || null;
    const repoUrl = data.repoUrl || data.repo_url || null;
    const tags = Array.isArray(data.tags) ? data.tags : [];
    const featured = data.featured === true;
    const published = data.published !== false;
    const displayOrder = data.displayOrder || data.display_order || 0;

    const res = await pool.query(
      `INSERT INTO projects (title, description, image_url, live_url, repo_url, tags, featured, published, display_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [data.title, data.description, imageUrl, liveUrl, repoUrl, tags, featured, published, displayOrder]
    );

    return formatProject(res.rows[0]);
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    let idx = 1;

    const map = {
      title: "title",
      description: "description",
      imageUrl: "image_url",
      image_url: "image_url",
      liveUrl: "live_url",
      live_url: "live_url",
      repoUrl: "repo_url",
      repo_url: "repo_url",
      tags: "tags",
      featured: "featured",
      published: "published",
      displayOrder: "display_order",
      display_order: "display_order",
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

    const query = `UPDATE projects SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;
    const res = await pool.query(query, values);
    return formatProject(res.rows[0]);
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM projects WHERE id = $1 RETURNING id", [id]);
    return res.rowCount > 0;
  },
};
