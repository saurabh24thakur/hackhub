
const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware.js');
const { updateUserRole, searchUsers, getUsers } = require('../controllers/userController.js');

// @desc    Update user role
// @route   PUT /api/users/:id/role
// @access  Private/Admin
router.route('/:id/role').put(protect, admin, updateUserRole);

// @desc    Search for users
// @route   GET /api/users/search
// @access  Private
router.route('/search').get(protect, searchUsers);

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
router.route('/').get(protect, admin, getUsers);

module.exports = router;
