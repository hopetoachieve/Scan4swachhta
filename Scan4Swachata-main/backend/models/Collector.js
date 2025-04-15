const mongoose = require('mongoose');

const collectorSchema = new mongoose.Schema({
  collectorId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  assignedArea: String,
  ratingsGiven: [{
    rating: Number,
    date: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Collector', collectorSchema);

