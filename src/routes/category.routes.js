'use strict'
// Import packages
const { Router } = require('express');

// import controllers
const category = require('../controllers/category.controller');

// Import middlewares
const token = require('../utils/token.util');

// Create instance
const router = Router();

router.get('/category', token.verify, category.get);

module.exports = router;