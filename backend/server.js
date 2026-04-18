// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// Connect to MongoDB
connectDB();

// ============================================
// CORS CONFIGURATION - PUT THIS EXACTLY HERE
// ============================================
app.use(cors({ 
  origin: [
    'http://localhost:3000',                          // Local development
    'https://thefolio-frontend.onrender.com',         // Your LIVE frontend URL
    'https://thefolio-frontend.onrender.com'          // Can add more if needed
  ], 
  credentials: true                                    // Allows cookies/tokens
}));

// ============================================
// OTHER MIDDLEWARE
// ============================================
app.use(express.json());  // Parse JSON request bodies

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============================================
// API ROUTES
// ============================================
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});