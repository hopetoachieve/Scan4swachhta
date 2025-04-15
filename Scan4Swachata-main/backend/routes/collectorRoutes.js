const express = require('express');
const router = express.Router();
const Collector = require('../models/Collector');

// Register
router.post('/register', async (req, res) => {
  const { collectorId, password, name, assignedArea } = req.body;
  try {
    const newCollector = new Collector({ collectorId, password, name, assignedArea });
    await newCollector.save();
    res.status(201).json({ message: 'Collector registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { collectorId, password } = req.body;
  try {
    const collector = await Collector.findOne({ collectorId });
    if (!collector || collector.password !== password) {
      return res.status(401).json({ error: 'Invalid ID or password' });
    }
    res.json({ message: 'Login successful', collector });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
