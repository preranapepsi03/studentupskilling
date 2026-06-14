// 1. Import Express so we can use its built-in router mini-app
const express = require('express');
const router = express.Router();

// 2. Import the controller we just built so we can link routes to its brains
const taskController = require('../controllers/taskController');

// 3. Map HTTP requests directly to Controller functions
// When someone hits the base URL, send them to the corresponding controller method
router.get('/', taskController.getTasks);  // GET request -> fetch tasks
router.post('/', taskController.addTask); // POST request -> add a task

// 4. Export this router map so server.js can plug it in
module.exports = router;