const express = require('express');
const { getAllUsers } = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');
const db = require('../config/db'); // ✅ Import MySQL Pool
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

router.get('/', authenticate, getAllUsers);


router.put('/update-password', authenticate, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user?.id; // Ensure userId is available
  
    try {
      if (!userId) {
        console.error('Error: userId is undefined');
        return res.status(400).json({ message: 'Invalid user ID' });
      }
  
      console.log('User ID:', userId); // Debugging
  
      // Fetch user using Sequelize
      const user = await User.findOne({ where: { id: userId } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if current password matches
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
  
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      // Update password using Sequelize
      await user.update({ password: hashedPassword });
  
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  




module.exports = router;