// Import packages
const express = require('express');

// Import controllers
const user = require('../controllers/user.controller');

// Create instance
const { Router } = express;
const router = Router();

router.post('/user/signup', user.signup);

module.exports = router;