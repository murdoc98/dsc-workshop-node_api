// Import packages
const { Router } = require('express');

// Import controllers
const user = require('../controllers/user.controller');

// Import middlewares
const token = require('../utils/token.util');

// Create instance
const router = Router();

router.get('/', (req, res) => res.send('owo'));

/**
 * @swagger
 * tags:
 *  name: User
 *  description: API para interactuar con los usuarios
 */

/**
 * @swagger
 * paths:
 *  /user/profile:
 *   get:
 *      summary: Muestra los datos de un usuario que ha sido autenticado
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *      responses:
 *          200:
 *          description: Regresa el token en el header
 */
router.get('/user/profile', token.verify, user.profile);

/**
 * @swagger
 * paths:
 *  /user/signup:
 *   post:
 *      summary: Registra al usuario en la API
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *      responses:
 *          200:
 *          description: Regresa el token en el header
 */
router.post('/user/signup', user.signup);

/**
 * @swagger
 * paths:
 *      /user/login:
 *          post:
 *              summary: Autentica al usuario en la API
 *              tags: [User]
 *          responses:
 *              200:
 *                  description: El usuario ha sido autenticado
 */
router.post('/user/login', user.login);

/**
 * @swagger
 * paths:
 *  /user/logout:
 *   put:
 *      summary: Finaliza la sesion actual del usuario
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *      responses:
 *          200:
 *          description: Regresa el token en el header
 */
router.put('/user/logout', token.verify, user.logout);

module.exports = router;