const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./api/routes/authRoutes');
const hackathonRoutes = require('./api/routes/hackathonRoutes');
const teamRoutes = require('./api/routes/teamRoutes');
const userRoutes = require('./api/routes/userRoutes');

const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, origin);
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect('mongodb+srv://root:root@cluster0.x4yli1y.mongodb.net/hackathon_battalion', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

app.use('/api/auth', authRoutes);
app.use('/api/hackathons', hackathonRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
