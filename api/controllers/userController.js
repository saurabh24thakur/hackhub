
const User = require('../models/User.js');

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['admin', 'user'].includes(role)) {
      return res.status(400).send('Invalid role');
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: 'User role updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { name } = req.query;
    const users = await User.find({ name: { $regex: name, $options: 'i' } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateUserRole, searchUsers, getUsers };
