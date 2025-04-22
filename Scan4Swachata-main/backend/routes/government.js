const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Government = require('../models/Government');
const Citizen = require('../models/Citizen');
const Collector = require('../models/Collector');


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

// GET /api/government/overview
router.get('/overview', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // ✅ 1. Total Waste from Citizens
    const citizens = await Citizen.find();
    const totalWasteToday = citizens.reduce((total, citizen) => {
      const todayEntries = citizen.entries.filter(e => new Date(e.date) >= today);
      const weightSum = todayEntries.reduce((sum, e) => sum + (e.weight || 0), 0);
      return total + weightSum;
    }, 0);

    // ✅ 2. Scans Today from Collectors
    const collectors = await Collector.find();
    const scansToday = collectors.reduce((total, collector) => {
      const todayRatings = collector.ratingsGiven.filter(r => new Date(r.date) >= today);
      return total + todayRatings.length;
    }, 0);

    // ✅ 3. Top User (use same logic as existing top-citizens route)
    const scores = citizens.map(c => {
      const score = c.entries.reduce((acc, e) => acc + (e.qualityRating || 0), 0);
      return { name: c.name, score };
    });
    const topUser = scores.sort((a, b) => b.score - a.score)[0]?.name || 'N/A';
    // Generate date keys for last 7 days
const scansPerDay = {};
for (let i = 6; i >= 0; i--) {
  const d = new Date();
  d.setDate(d.getDate() - i);
  const key = d.toISOString().split('T')[0]; // format: YYYY-MM-DD
  scansPerDay[key] = 0;
  
}

// Count scans per day
collectors.forEach(collector => {
  collector.ratingsGiven.forEach(r => {
    const date = new Date(r.date);
    const key = date.toISOString().split('T')[0];
    if (scansPerDay[key] !== undefined) {
      scansPerDay[key]++;
    }
  });
});

    // ✅ Calculate citizens with more than 15kg in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // includes today

    const heavyContributors = citizens.filter(citizen => {
      const last7DaysEntries = citizen.entries.filter(entry => {
        const date = new Date(entry.date);
        return date >= sevenDaysAgo;
      });

      const totalWeight = last7DaysEntries.reduce((sum, entry) => sum + (entry.weight || 0), 0);
      return totalWeight > 15;
    }).map(c => ({
      name: c.name,
      email: c.email,
      city: c.city
    }));

    res.json({
  totalWasteToday,
  scansToday,
  topUser,
  scansPerDay,
  heavyContributors
});
  } catch (error) {
    console.error('Dashboard Overview Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a Citizen by email
router.delete('/citizens/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const result = await Citizen.findOneAndDelete({ email });
    if (!result) {
      return res.status(404).json({ message: 'Citizen not found' });
    }
    res.json({ message: 'Citizen deleted successfully' });
  } catch (err) {
    console.error('Delete Citizen Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a Collector by collectorId
router.delete('/collectors/:collectorId', async (req, res) => {
  try {
    const collectorId = req.params.collectorId;
    const result = await Collector.findOneAndDelete({ collectorId });
    if (!result) {
      return res.status(404).json({ message: 'Collector not found' });
    }
    res.json({ message: 'Collector deleted successfully' });
  } catch (err) {
    console.error('Delete Collector Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
// This code defines two routes for government officials: registration and login.