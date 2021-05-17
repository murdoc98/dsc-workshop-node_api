'use strict'
// import packages
const { Router } = require('express');

// Import controllers
const product = require('../controllers/product.controller');

// Import middlewares
const token = require('../utils/token.util');

// Create instance
const router = Router();

router.get('/product', token.verify, product.get);
router.post('/product', token.verify, product.post);
router.delete('/product', token.verify, product.delete);

module.exports = router;