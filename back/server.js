// import env variable
require('dotenv').config();
console.log(">> DATABASE_TASKS en runtime:", process.env.DATABASE_TASKS);
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const tasksRoutes = require('./routes/tasks');

const app = express();
const PORT = 3001;

// set requests rate limit 
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: 'Too many requests, try again later'
});

// enable middlewares: cors, parse json and request limit
app.use(cors());
app.use(bodyParser.json());
app.use(limiter); // Ahora es global y antes de las rutas

// set up the backend route
app.use('/tasks', tasksRoutes);

// handle errors
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
