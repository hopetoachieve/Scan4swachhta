const express = require('express');
const router = express.Router();
const Citizen = require('../models/Citizen');
const Collector = require('../models/Collector');
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

    // ✅ Return name, token, and _id as userId
    res.status(200).json({ 
      message: 'Login successful', 
      token, 
      name: citizen.name, 
      userId: citizen._id  // ✅ This is all you need
    });
    
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


//Get all the citizens
router.get('/all', async (req, res) => {
  try {
    const citizens = await Citizen.find({}, 'name _id'); // only name & ID
    res.json(citizens);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching citizens' });
  }
});

// Get citizen by ID
// Assuming you already required Citizen model
router.get('/:id', async (req, res) => {
  try {
    const citizen = await Citizen.findById(req.params.id);

    if (!citizen) {
      return res.status(404).json({ message: 'Citizen not found' });
    }

    // Calculate totalPoints
    const totalPoints = citizen.entries.reduce((sum, entry) => {
      return sum + (entry.weight * entry.qualityRating);
    }, 0);

    // Calculate today's score
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    const todaysScore = citizen.entries
      .filter(entry => new Date(entry.date) >= today)
      .reduce((sum, entry) => {
        return sum + (entry.weight * entry.qualityRating);
      }, 0);

    res.json({ totalPoints, todaysScore });
  } catch (error) {
    console.error('Error fetching citizen data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route: GET /api/leaderboard/area-scores
router.get('/leaderboard/area-scores', async (req, res) => {
  try {
    const collectors = await Collector.find();
    
    const areaScores = {};

    collectors.forEach(collector => {
      const totalRating = collector.ratingsGiven.reduce((acc, r) => acc + r.rating, 0);
      if (!areaScores[collector.assignedArea]) {
        areaScores[collector.assignedArea] = totalRating;
      } else {
        areaScores[collector.assignedArea] += totalRating;
      }
    });

    res.json(areaScores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route: GET /api/leaderboard/top-citizens
router.get('/leaderboard/top-citizens', async (req, res) => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const citizens = await Citizen.find();

    const scores = citizens.map(citizen => {
      const scoreThisMonth = citizen.entries
        .filter(e => new Date(e.date) >= oneMonthAgo)
        .reduce((acc, entry) => acc + entry.qualityRating, 0);

      return {
        name: citizen.name,
        score: scoreThisMonth
      };
    });

    const sorted = scores.sort((a, b) => b.score - a.score).slice(0, 5);
    res.json(sorted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
