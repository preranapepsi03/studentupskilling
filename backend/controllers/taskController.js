// If you are importing your database connection pool from db.js, use a modern import:
import { pool } from '../db.js'; 

// 1. Export getTasks as a modern named export
export async function getTasks(req, res) {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC;');
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Database query error (GET):", error);
    res.status(500).json({ error: "Internal server database error" });
  }
}

// 2. Export createTask as a modern named export (This fixes the exact error in your screenshot!)
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