const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const citizenRoutes = require('./backend/routes/citizenRoutes');

const app = express(); // ✅ This should come before app.use() or app.get()

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); 

// Redirect root to landing.html
app.get('/', (req, res) => {
  res.redirect('/landing.html');
});

// API Routes
app.use('/api/citizen', citizenRoutes);
const collectorRoutes = require('./backend/routes/collectorRoutes');
app.use('/api/collector', collectorRoutes);
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.log('❌ MongoDB Error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
