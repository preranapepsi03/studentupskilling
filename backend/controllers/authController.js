import { pool } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ==========================================
// DAY 22: Register a brand new user
// ==========================================
export async function signupUser(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const userCheck = await pool.query('SELECT * FROM users WHERE username = $1;', [username.trim()]);
    if (userCheck.rowCount > 0) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const result = await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at;',
      [username.trim(), passwordHash]
    );

    res.status(201).json({
      message: "User registered successfully 🎉",
      user: result.rows[0]
    });

  } catch (error) {
    console.error("❌ Signup API Error:", error);
    res.status(500).json({ error: "Internal server error during registration" });
  }
}

// ==========================================
// DAY 23 & 24: Authenticate User & Issue JWT
// ==========================================
export async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    // 1. Validation check
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // 2. Search for the user in the database
    const result = await pool.query('SELECT * FROM users WHERE username = $1;', [username.trim()]);
    
    if (result.rowCount === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];

    // 3. Compare incoming plaintext password with the database hash safely
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 4. Day 24: Generate a signed JSON Web Token valid for 24 hours
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // 5. Success! Return the token alongside user details to the frontend client
    res.status(200).json({
      message: "Login successful! Welcome back 👋",
      token, 
      user: {
        id: user.id,
        username: user.username,
        created_at: user.created_at
      }
    });

  } catch (error) {
    console.error("❌ Login API Error:", error);
    res.status(500).json({ error: "Internal server error during authentication" });
  }
}