// Import packages
const { Router } = require('express');

// Import controllers
const user = require('../controllers/user.controller');

// Import middlewares
const token = require('../utils/token.util');

// Create instance
const router = Router();

/**
 * @swagger
 * tags:
 *  name: User
 *  description: API para interactuar con los usuarios
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', (req, res) => res.send('owo'));
router.get('/user/profile', token.verify, user.profile);
router.post('/user/signup', user.signup);
router.post('/user/login', user.login);
router.put('/user/logout', token.verify, user.logout);

module.exports = router;