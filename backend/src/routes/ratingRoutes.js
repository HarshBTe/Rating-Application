const express = require('express');
const { submitRating, getStoreRatings } = require('../controllers/ratingController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticate, submitRating);
router.get('/', authenticate, getStoreRatings);

module.exports = router;
