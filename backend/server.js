const express = require("express"); 
const pool = require('./db');
const app = express(); 

// 1. MIDDLEWARE
app.use(express.json());

// 2. GET ROUTE
app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC;');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 3. POST ROUTE 
app.post('/tasks', async (req, res) => {
  try {
    const { title } = req.body;
    const queryText = 'INSERT INTO tasks (title) VALUES ($1) RETURNING *;';
    const result = await pool.query(queryText, [title]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 4. START SERVER (Added this!)
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running and listening on port ${PORT}`);
});