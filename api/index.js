
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const authRoutes = require('./routes/authRoutes.js');
const hackathonRoutes = require('./routes/hackathonRoutes.js');
const teamRoutes = require('./routes/teamRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://root:root@cluster0.x4yli1y.mongodb.net/hackathon_battalion', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const app = express();

// Use CORS
const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

// Vercel handles the /api prefix, so we remove it from the routes here
app.use('/auth', authRoutes);
app.use('/hackathons', hackathonRoutes);
app.use('/teams', teamRoutes);
app.use('/users', userRoutes);

module.exports = app;
