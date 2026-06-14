// 1. Import the model we just built so we can use its database queries
const taskModel = require('../models/taskModel');

// 2. Handle GET requests (Fetching tasks)
const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getAllTasks(); // Tell the Model to get data from Postgres
    res.json(tasks); // Hand that clean data array directly back to the browser/frontend
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error'); // If something broke, tell the browser it's a server issue
  }
};

// 3. Handle POST requests (Adding a new task)
const addTask = async (req, res) => {
  try {
    const { title } = req.body; // Unpack the incoming package from the frontend to find the task title
    const newTask = await taskModel.createTask(title); // Tell the Model to save this specific title
    res.status(201).json(newTask); // Send back the brand-new task with a "201 Created" success status
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// 4. Export these functions so our Router file can access them
module.exports = {
  getTasks,
  addTask
};