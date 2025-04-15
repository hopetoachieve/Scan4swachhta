const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Government = require('../models/Government');

// Register
router.post('/register', async (req, res) => {
  console.log("Municipal registration hit:", req.body);
  const {
    name,
    email,
    phone,
    department,
    city,
    officialId,
    password
  } = req.body;

  if (!name || !email || !phone || !department || !city || !officialId || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if official ID or email already exists
    const existingOfficer = await Government.findOne({ officialId });
    const existingEmail = await Government.findOne({ email });

    if (existingOfficer) {
      return res.status(400).json({ message: 'Official ID already exists.' });
    }

    if (existingEmail) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newOfficer = new Government({
      name,
      email,
      phone,
      department,
      city,
      officialId,
      password: hashedPassword
    });

    await newOfficer.save();
    res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;  // Destructure email and password from request body

  if (!email || !password) {  // Check for missing email or password
    return res.status(400).json({ message: 'Both email and password are required.' });
  }

  try {
    // Search for the officer by email, not officialId
    const officer = await Government.findOne({ email }); 

    if (!officer) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, officer.password); 
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful!' }); // Successful login
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
// This code defines two routes for government officials: registration and login.