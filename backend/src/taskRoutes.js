const express = require('express');
const TaskModel = require('./taskModel');

const router = express.Router();

const VALID_STATUSES = ['all', 'active', 'completed'];

// GET /api/tasks?search=&status=all|active|completed
router.get('/', async (req, res) => {
  try {
    const search = typeof req.query.search === 'string' ? req.query.search : '';
    const status = VALID_STATUSES.includes(req.query.status) ? req.query.status : 'all';
    const tasks = await TaskModel.getAll({ search, status });
    res.json(tasks);
  } catch (err) {
    console.error('GET /tasks error:', err);
    res.status(500).json({ error: 'Failed to fetch tasks.' });
  }
});

// GET /api/tasks/:id
router.get('/:id', async (req, res) => {
  try {
    const task = await TaskModel.getById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found.' });
    res.json(task);
  } catch (err) {
    console.error('GET /tasks/:id error:', err);
    res.status(500).json({ error: 'Failed to fetch task.' });
  }
});

// POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title is required.' });
    }
    if (description !== undefined && typeof description !== 'string') {
      return res.status(400).json({ error: 'Description must be a string.' });
    }

    const task = await TaskModel.create({ title, description });
    res.status(201).json(task);
  } catch (err) {
    console.error('POST /tasks error:', err);
    res.status(500).json({ error: 'Failed to create task.' });
  }
});

// PUT /api/tasks/:id  — update title, description, and/or completed
router.put('/:id', async (req, res) => {
  try {
    const existing = await TaskModel.getById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Task not found.' });

    const { title, description, completed } = req.body;

    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
      return res.status(400).json({ error: 'Title cannot be empty.' });
    }
    if (description !== undefined && typeof description !== 'string') {
      return res.status(400).json({ error: 'Description must be a string.' });
    }
    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Completed must be a boolean.' });
    }

    const updated = await TaskModel.update(req.params.id, { title, description, completed });
    res.json(updated);
  } catch (err) {
    console.error('PUT /tasks/:id error:', err);
    res.status(500).json({ error: 'Failed to update task.' });
  }
});

// PATCH /api/tasks/:id/toggle — flip completed state
router.patch('/:id/toggle', async (req, res) => {
  try {
    const existing = await TaskModel.getById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Task not found.' });

    const updated = await TaskModel.update(req.params.id, {
      completed: !existing.completed,
    });
    res.json(updated);
  } catch (err) {
    console.error('PATCH /tasks/:id/toggle error:', err);
    res.status(500).json({ error: 'Failed to toggle task.' });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await TaskModel.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Task not found.' });
    res.status(204).send();
  } catch (err) {
    console.error('DELETE /tasks/:id error:', err);
    res.status(500).json({ error: 'Failed to delete task.' });
  }
});

module.exports = router;
