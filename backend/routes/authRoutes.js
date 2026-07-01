import express from 'express';
import { signupUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Day 22: Registration Pipeline
router.post('/signup', signupUser);

// Day 23: Verification Pipeline
router.post('/login', loginUser);

export default router;