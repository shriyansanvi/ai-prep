const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// These combine with the prefix in index.js
// Final URL: http://localhost:5000/api/auth/signup
router.post('/signup', authController.register);
router.post('/login', authController.login);

module.exports = router;