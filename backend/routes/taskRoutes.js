import express from 'express';
// If your controller functions are imported here, keep them, or use placeholder functions for now
import { getTasks, createTask } from '../controllers/taskController.js'; 

const router = express.Router();

// Define your endpoints matching Day 15 & 17
router.get('/', getTasks);
router.post('/', createTask);

// This line is what fixes the exact error in your screenshot!
export default router;