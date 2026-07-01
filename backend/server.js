import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import our functional feature routing blueprints
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Day 22: Authentication entry route

// Configure environment variable injection layers
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware configuration layers
app.use(cors());
app.use(express.json()); // Parses incoming application/json payloads automatically

// 🌐 Application Gateway Routing Plugs
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);   // Day 22: New endpoint tree for /auth/signup

// Root health-check endpoint monitor channel
app.get('/', (req, res) => {
  res.json({ status: "online", environment: "development", message: "StackTask API operational pipeline active." });
});

// Launch the running system node process loop
app.listen(PORT, () => {
  console.log(`🚀 Backend API Server listening on: http://localhost:${PORT}`);
  console.log(`🔑 Testing secret loading:`, process.env.JWT_SECRET); // Add this line!
});