const express = require('express');
const app = express();

// Routes
const authRoutes = require('./routes/authRoutes');
const bepoRoutes = require('./routes/bepoRoutes');

// Middleware
app.use(express.json());

// Health check route - REQUIRED for Render to confirm the app is live
app.get('/', (req, res) => {
  res.send('✅ CodeCon Backend is up and running!');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bepo', bepoRoutes);

module.exports = app;
