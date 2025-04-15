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
  assignedArea: String
});

module.exports = mongoose.model('Collector', collectorSchema);

