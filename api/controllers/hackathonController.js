
const Hackathon = require('../models/Hackathon.js');

// Create a new hackathon
const createHackathon = async (req, res) => {
  try {
    const hackathon = new Hackathon(req.body);
    await hackathon.save();
    res.status(201).send(hackathon);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all hackathons
const getHackathons = async (req, res) => {
  try {
    let query = {};
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }
    const hackathons = await Hackathon.find(query);
    res.status(200).send(hackathons);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a hackathon by ID
const getHackathonById = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) {
      return res.status(404).send();
    }
    res.status(200).send(hackathon);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a hackathon by ID
const updateHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!hackathon) {
      return res.status(404).send();
    }
    res.status(200).send(hackathon);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a hackathon by ID
const deleteHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndDelete(req.params.id);
    if (!hackathon) {
      return res.status(404).send();
    }
    res.status(200).send(hackathon);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createHackathon, getHackathons, getHackathonById, updateHackathon, deleteHackathon };
