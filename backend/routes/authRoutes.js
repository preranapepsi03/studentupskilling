import express from 'express';
import { signupUser } from '../controllers/authController.js';

const router = express.Router();

// Day 22 Signup Endpoint
router.post('/signup', signupUser);

export default router;