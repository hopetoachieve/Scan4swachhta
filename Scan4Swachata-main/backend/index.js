// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

const citizenRoutes = require('./routes/citizenRoutes');
app.use('/api/citizen', citizenRoutes);
const collectorRoutes = require('./routes/collector');
app.use('/api/collector', collectorRoutes);
const governmentRoutes = require('./routes/government');
app.use('/api/government', governmentRoutes);

app.use(express.static('public'));
app.use('/images', express.static('images'));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Example route
app.get('/', (req, res) => {
    res.send("Scan4Swachata Backend Running ✅");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});





