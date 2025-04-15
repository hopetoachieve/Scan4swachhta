const express = require('express');
const router = express.Router();
const Government = require('../models/Government');

// Register
router.post('/register', async (req, res) => {
  const { officerId, password } = req.body;

  if (!officerId || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingOfficer = await Government.findOne({ officerId });
    if (existingOfficer) {
      return res.status(400).json({ message: 'Officer ID already exists.' });
    }

    const officer = new Government({ officerId, password });
    await officer.save();
    res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { officerId, password } = req.body;

  try {
    const officer = await Government.findOne({ officerId });
    if (!officer || officer.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
