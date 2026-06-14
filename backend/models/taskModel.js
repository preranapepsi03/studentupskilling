// 1. Import your database connection pool
const pool = require('../db');

// 2. Create a function to fetch all tasks from the DB
const getAllTasks = async () => {
  const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC;');
  return result.rows; // Returns the clean array of tasks
};

// 3. Create a function to insert a new task into the DB
const createTask = async (title) => {
  const queryText = 'INSERT INTO tasks (title) VALUES ($1) RETURNING *;';
  const result = await pool.query(queryText, [title]);
  return result.rows[0]; // Returns the single new task object that was just created
};

// 4. Export these two functions so other files can use them
module.exports = {
  getAllTasks,
  createTask
};