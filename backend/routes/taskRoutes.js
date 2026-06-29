import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js'; 

const router = express.Router();

// Fetch all records
router.get('/', getTasks);

// Add a new record
router.post('/', createTask);

// Day 18: Update a task's title by ID
router.put('/:id', updateTask);

// Day 18: Delete a specific record by ID
router.delete('/:id', deleteTask); 

export default router;