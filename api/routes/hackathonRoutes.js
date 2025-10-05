
const express = require('express');
const router = express.Router();
const hackathonController = require('../controllers/hackathonController.js');

// POST a new hackathon
router.post('/', hackathonController.createHackathon);

// GET all hackathons
router.get('/', hackathonController.getHackathons);

// GET a hackathon by ID
router.get('/:id', hackathonController.getHackathonById);

// PUT to update a hackathon by ID
router.put('/:id', hackathonController.updateHackathon);

// DELETE a hackathon by ID
router.delete('/:id', hackathonController.deleteHackathon);

module.exports = router;
