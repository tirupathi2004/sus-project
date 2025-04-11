const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Check for required environment variables
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in environment variables.');
  process.exit(1);
}
if (!process.env.PORT) {
  console.warn('⚠️ PORT is not defined in environment variables. Using default port 3000.');
}

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB Connection Error: ${err.message}`);
    process.exit(1);
  }
};
connectDB();

// Graceful shutdown of MongoDB connection
const shutdown = async () => {
  try {
    await mongoose.connection.close();
    console.log('🛑 MongoDB connection closed.');
    process.exit(0);
  } catch (err) {
    console.error(`❌ Error closing MongoDB connection: ${err.message}`);
    process.exit(1);
  }
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// CodeCon API Routes
try {
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/profile', require('./routes/profile'));
  app.use('/api/challenges', require('./routes/challenges'));
  app.use('/api/courses', require('./routes/courses'));
  app.use('/api/compiler', require('./routes/compiler'));
  app.use('/api/bepo', require('./routes/bepo'));
  app.use('/api/payment', require('./routes/payment'));
  app.use('/api/admin', require('./routes/admin'));
} catch (err) {
  console.error(`❌ Error loading routes: ${err.message}`);
  process.exit(1);
}

// Root endpoint
app.get('/', (req, res) => {
  res.send('🚀 CodeCon Backend is Live & Connected to MongoDB');
});

// Port binding for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🟢 CodeCon server running on port ${PORT}`);
});
