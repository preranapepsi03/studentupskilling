import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORT = 5000;

// Middleware configuration
app.use(cors());
app.use(express.json());

// 4. Route Mounting
app.use('/tasks', taskRoutes);

// Catch-all health diagnostic endpoint
app.get('/', (req, res) => {
  res.send({ status: "online", service: "StackTask Database Engine" });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend API Server listening on: http://localhost:${PORT}`);
});