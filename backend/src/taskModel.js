const pool = require('./db');

// Convert snake_case DB row to camelCase for the API response
function toTask(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    completed: row.completed,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const TaskModel = {
  async getAll({ search = '', status = 'all' }) {
    const params = [];
    const conditions = [];

    // Search by title (case-insensitive)
    if (search.trim()) {
      params.push(`%${search.trim()}%`);
      conditions.push(`title ILIKE $${params.length}`);
    }

    // Filter by status
    if (status === 'active') {
      conditions.push('completed = FALSE');
    } else if (status === 'completed') {
      conditions.push('completed = TRUE');
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const { rows } = await pool.query(
      `SELECT * FROM tasks ${where} ORDER BY created_at DESC`,
      params
    );
    return rows.map(toTask);
  },

  async getById(id) {
    const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return rows[0] ? toTask(rows[0]) : null;
  },

  async create({ title, description = '' }) {
    const { rows } = await pool.query(
      `INSERT INTO tasks (title, description)
       VALUES ($1, $2)
       RETURNING *`,
      [title.trim(), description.trim()]
    );
    return toTask(rows[0]);
  },

  async update(id, { title, description, completed }) {
    // Build SET clause dynamically from only provided fields
    const fields = [];
    const params = [];

    if (title !== undefined) {
      params.push(title.trim());
      fields.push(`title = $${params.length}`);
    }
    if (description !== undefined) {
      params.push(description.trim());
      fields.push(`description = $${params.length}`);
    }
    if (completed !== undefined) {
      params.push(completed);
      fields.push(`completed = $${params.length}`);
    }

    if (fields.length === 0) return this.getById(id);

    fields.push(`updated_at = NOW()`);
    params.push(id);

    const { rows } = await pool.query(
      `UPDATE tasks SET ${fields.join(', ')} WHERE id = $${params.length} RETURNING *`,
      params
    );
    return rows[0] ? toTask(rows[0]) : null;
  },

  async remove(id) {
    const { rowCount } = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    return rowCount > 0;
  },
};

module.exports = TaskModel;
