const express = require('express');
const { login, registerUser } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', login);

module.exports = router;
