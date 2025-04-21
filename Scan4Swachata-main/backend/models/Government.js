const mongoose = require('mongoose');

const governmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  city: { type: String, required: true },
  officialId: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true // Optional: adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Government', governmentSchema);
// This model defines the structure of the Government collection in MongoDB.