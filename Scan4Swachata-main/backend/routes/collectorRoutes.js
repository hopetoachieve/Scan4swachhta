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

// Get dashboard summary
router.get('/collector/dashboard/:id', async (req, res) => {
  try {
    const collector = await Collector.findOne({ collectorId: req.params.id });
    if (!collector) return res.status(404).json({ message: 'Collector not found' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysRatings = collector.ratingsGiven.filter(r => new Date(r.date) >= today);
    const totalRated = todaysRatings.length;
    const avgRating = totalRated > 0
      ? (todaysRatings.reduce((sum, r) => sum + r.rating, 0) / totalRated).toFixed(1)
      : 0;

    res.json({
      todaysCollections: totalRated,
      totalRated,
      avgRating
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit new rating
router.post('/collector/rating', async (req, res) => {
  const { collectorId, rating } = req.body;
  if (!collectorId || !rating) return res.status(400).json({ message: 'Invalid data' });

  try {
    const collector = await Collector.findOne({ collectorId });
    if (!collector) return res.status(404).json({ message: 'Collector not found' });

    collector.ratingsGiven.push({ rating });
    await collector.save();

    res.json({ message: 'Rating submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
