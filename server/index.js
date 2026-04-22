require('dotenv').config(); // 🚀 1. This MUST be at the very top
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const roadmapRoutes = require('./routes/roadmapRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// 2. Use the variable from your .env file
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/careerpath";

mongoose.connect(MONGO_URI)
  .then(() => console.log("🍃 MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/roadmap', roadmapRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));