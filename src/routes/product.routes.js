// import packages
const { Router } = require('express');

// Import controllers
const product = require('../controllers/product.controller');

// Import middlewares
const token = require('../utils/token.util');

// Create instance
const router = Router();

router.get('/product', token.verify, product.get)

module.exports = router;