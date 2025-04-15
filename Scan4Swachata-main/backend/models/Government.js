const mongoose = require('mongoose');

const governmentSchema = new mongoose.Schema({
  officerId: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Government', governmentSchema);
