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
// UPDATE a task's completion status
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params; // Grabs the ID from the URL path
    const { is_completed } = req.body; // Grabs the new status from the Postman body

    const queryText = 'UPDATE tasks SET is_completed = $1 WHERE id = $2 RETURNING *;';
    const result = await pool.query(queryText, [is_completed, id]);

    // If result.rows is empty, it means that ID doesn't exist in the database
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(result.rows[0]); // Return the newly updated task row
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// DELETE a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const queryText = 'DELETE FROM tasks WHERE id = $1 RETURNING *;';
    const result = await pool.query(queryText, [id]);

    // Handle case where trying to delete something that isn't there
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: '💥 Task was successfully deleted!', deletedTask: result.rows[0] });
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