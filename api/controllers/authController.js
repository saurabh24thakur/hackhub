
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const userCount = await User.countDocuments();
    const role = userCount === 0 ? 'admin' : 'user';

    // The password will be hashed by the pre-save hook in the User model
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).send('User created');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Explicitly select the password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    const userPayload = { id: user._id, name: user.name, email: user.email, role: user.role };
    console.log('User logged in:', userPayload);

    const token = jwt.sign(userPayload, process.env.JWT_SECRET || 'shhhh', { expiresIn: '1h' });
    res.status(200).json({ token, user: userPayload });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
