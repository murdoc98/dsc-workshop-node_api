'use strict'
// Import packages
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const chalk = require('chalk');

require('dotenv').config();

const app = express();

// Settings
app.set('port', 8080);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Public folder
app.use(express.static(path.resolve(__dirname, 'public')));

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