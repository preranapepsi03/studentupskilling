import { pool } from '../db.js';
import bcrypt from 'bcryptjs';

// Day 22: Register a brand new user
export async function signupUser(req, res) {
  try {
    const { username, password } = req.body;

    // 1. Validation
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // 2. Check if username already exists in the database
    const userCheck = await pool.query('SELECT * FROM users WHERE username = $1;', [username.trim()]);
    if (userCheck.rowCount > 0) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    // 3. Hash the password safely (Salt rounds = 10)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 4. Save the user record into PostgreSQL
    const result = await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at;',
      [username.trim(), passwordHash]
    );

    // Return the newly created user (excluding the hash for safety!)
    res.status(201).json({
      message: "User registered successfully 🎉",
      user: result.rows[0]
    });

  } catch (error) {
    console.error("❌ Signup API Error:", error);
    res.status(500).json({ error: "Internal server error during registration" });
  }
}