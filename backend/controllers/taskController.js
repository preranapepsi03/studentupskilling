import { pool } from '../db.js'; 

// 1. Fetch all tasks from the database
export async function getTasks(req, res) {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC;');
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Database query error (GET):", error);
    res.status(500).json({ error: "Internal server database error" });
  }
}

// 2. Add a new task to the database
export async function createTask(req, res) {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    const result = await pool.query(
      'INSERT INTO tasks (title, is_completed) VALUES ($1, false) RETURNING *;',
      [title]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Database query error (POST):", error);
    res.status(500).json({ error: "Internal server database error" });
  }
}

// 3. Day 18: Update a task's title in the database
export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const result = await pool.query(
      'UPDATE tasks SET title = $1 WHERE id = $2 RETURNING *;',
      [title.trim(), id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Database query error (PUT):", error);
    res.status(500).json({ error: "Internal server database error" });
  }
}

// 4. Day 18: Delete a task by ID
export async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *;',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", deletedTask: result.rows[0] });
  } catch (error) {
    console.error("❌ Database query error (DELETE):", error);
    res.status(500).json({ error: "Internal server database error" });
  }
}