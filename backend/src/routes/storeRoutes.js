const express = require('express');
const { getAllStores} = require('../controllers/storeController');
const { createStore } = require('../controllers/storeController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authenticate, getAllStores);


// Only admin can create a store
router.post('/', authenticate, async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Only admin can create stores.' });
  }
  next();
}, createStore);




module.exports = router;
