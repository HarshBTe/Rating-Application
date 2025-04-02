const express = require('express');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();
const db = require('../config/db'); // ✅ Import MySQL Pool
const bcrypt = require("bcryptjs");

// ✅ Protected: Admin Dashboard Stats
router.get('/stats', authenticate, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    try {
        const [users] = await db.query('SELECT COUNT(*) AS totalUsers FROM Users');
        const [stores] = await db.query('SELECT COUNT(*) AS totalStores FROM Stores');
        const [ratings] = await db.query('SELECT COUNT(*) AS totalRatings FROM Ratings');

        res.json({
            totalUsers: users[0].totalUsers,
            totalStores: stores[0].totalStores,
            totalRatings: ratings[0].totalRatings
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// ✅ Protected: Get all normal & admin users
router.get("/users", authenticate, async (req, res) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    try {
      const [users] = await db.query(
        "SELECT id, name, email, address, role FROM Users WHERE role IN ('admin', 'user', 'owner')"
      );
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });



  

module.exports = router;
