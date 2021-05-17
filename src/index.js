'use strict'
// Import packages
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const chalk = require('chalk');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

const app = express();

// Settings
app.set('port', 8080);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Public folder
app.use(express.static(path.resolve(__dirname, 'public')));

// Multer to handle files
app.use(
	multer({
        fileFilter: function (req, file, cb) {
            const filesAllowed = ['jpg', 'png', 'jpeg'];
            const aux = file.mimetype.split('/');
            const fileExt = aux.pop();
            if (!filesAllowed.includes(fileExt))
                return cb(new Error('Only images are allowed'))
            cb(null, true)
        },
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path.resolve(__dirname, 'public', 'productImages'))
            },
            filename: function (req, file, cb) {
                const aux = file.mimetype.split('/');
                const fileExt = aux.pop();
                const fileName = `${uuidv4()}.${fileExt}`;
                cb(null, fileName)
            },
        }),
		limits: { fileSize: 100 * 1024 * 1024 } // Max 10Mb
	}).single('image')
);

// Database connection
require('./utils/database.util');

// Routes
app.use(require('./routes/user.routes'));
app.use(require('./routes/product.routes'));
app.use(require('./routes/category.routes'));

// Start the server
app.listen(app.get('port'), () => {
    console.log(
        chalk.blue.bold('Server on port: '),
        chalk.bold(app.get('port')),
    );
});