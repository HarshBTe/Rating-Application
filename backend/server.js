const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const storeRoutes = require('./src/routes/storeRoutes');
const ratingRoutes = require('./src/routes/ratingRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/stores', storeRoutes);
app.use('/ratings', ratingRoutes);
app.use('/admin', adminRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Welcome to the FullStack Intern Challenge API');
});



const startServer = async () => {
  try {
    await db.authenticate(); // Ensure DB is connected before syncing
    console.log('Database connected successfully.');

    await db.sync({ alter: true }); // Sync models

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1); // Exit if database connection fails
  }
};

startServer();
