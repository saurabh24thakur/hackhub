
const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  prize: { type: String, required: true },
});

const Hackathon = mongoose.model('Hackathon', hackathonSchema);

module.exports = Hackathon;
