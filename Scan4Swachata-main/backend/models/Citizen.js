const mongoose = require('mongoose');

const citizenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
 
  entries: [
    {
      weight: Number,
      qualityRating: Number,
      date: { type: Date, default: Date.now },
      collectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Collector' }
    }
  ]
});

module.exports = mongoose.models.Citizen || mongoose.model('Citizen', citizenSchema);

