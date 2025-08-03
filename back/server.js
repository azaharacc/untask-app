// Environment variables
require('dotenv').config();
console.log(">> DATABASE_TASKS en runtime:", process.env.DATABASE_TASKS);

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const tasksRoutes = require('./routes/tasks');
const authRouter = require('./routes/auth');

const app = express();
const PORT = 3001;

// Global middlewares
app.use(cors());
app.use(express.json());
app.use(rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: 'Too many requests, try again later',
}));

// Routes
app.use('/auth', authRouter);
app.use('/tasks', tasksRoutes);

// Error handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).send('Internal Server Error');
});

// Launch server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
