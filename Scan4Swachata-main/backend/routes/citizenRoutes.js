const express = require('express');
const router = express.Router();
const Citizen = require('../models/citizen');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await Citizen.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCitizen = new Citizen({ name, email, password: hashedPassword });
    await newCitizen.save();

    res.status(201).json({ message: 'Citizen registered successfully' });
  } catch (err) {
    console.error('❌ Registration error:', err); // ADD THIS LINE
    res.status(500).json({ message: 'Something went wrong' });
  }
});


// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const citizen = await Citizen.findOne({ email });
    if (!citizen) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, citizen.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: citizen._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
