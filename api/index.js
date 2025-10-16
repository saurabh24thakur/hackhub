
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const hackathonRoutes = require('./routes/hackathonRoutes.js');
const teamRoutes = require('./routes/teamRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/hackathons', hackathonRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
