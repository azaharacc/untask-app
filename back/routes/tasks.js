const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middleware/auth');
const getLeisureSuggestionOpenAI = require('../utils/openai');

// Create table if not exists
pool.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    suggestion TEXT
  )
`).catch(err => console.error('Error creating table:', err));

// GET
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER by id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/private', authenticateToken, async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC', [req.userId]);
  res.json(result.rows);xw
});

// POST
router.post('/', authenticateToken, async (req, res) => {
  const { name } = req.body;

  try {
    const existing = await pool.query(
      'SELECT * FROM tasks WHERE name = $1',
      [name]
    );
    if (existing.rows.length > 0) {
      return res.status(200).json(existing.rows[0]);
    }

    let suggestion;

    try {
      suggestion = await getLeisureSuggestionOpenAI(name);
    } catch (apiError) {
      console.error('❌ Error llamando a OpenAI:', apiError.response?.data || apiError.message);

      const fallback = await pool.query(
        'SELECT suggestion FROM tasks WHERE suggestion IS NOT NULL ORDER BY RANDOM() LIMIT 1'
      );
      suggestion = fallback.rows[0]?.suggestion || 'Take a deep breath';
    }

    const result = await pool.query(
      'INSERT INTO tasks (name, suggestion, user_id) VALUES ($1, $2, $3) RETURNING *',
      [name, suggestion, req.userId]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error('❌ Error creando tarea:', err);
    res.status(500).send('Error al crear la tarea');
  }
});

// DELETE
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
