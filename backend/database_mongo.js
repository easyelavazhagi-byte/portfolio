/**
 * MongoDB / Mongoose Alternative Configuration
 * -------------------------------------------------------------
 * To use MongoDB instead of SQLite:
 * 1. Install mongoose: npm install mongoose
 * 2. Set MONGODB_URI in your environment or .env
 * 3. Replace require('./database') in server.js with this file.
 */

/*
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB database'))
  .catch((err) => console.error('MongoDB connection error:', err));

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  long_description: String,
  tags: [String],
  features: [String],
  demo_type: { type: String, default: 'modal' },
  live_demo: String,
  github_url: String,
  featured: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: String,
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = {
  Project: mongoose.model('Project', ProjectSchema),
  Message: mongoose.model('Message', MessageSchema)
};
*/
