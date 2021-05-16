'use strict'
// Import packages
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const chalk = require('chalk');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

// extra code
const config = require('./config');

const app = express();

// Settings
app.set('port', 8080);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Public folder
app.use(express.static(path.resolve(__dirname, 'public')));

// Database connection
app.use(
    session({
        secret: process.env.DB_PASS,
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: config.MONGODB_URI })
    })
);

// Routes
app.use(require('./routes/user.routes'));

// Start the server
app.listen(app.get('port'), () => {
    console.log(
        chalk.blue.bold('Server on port: '),
        chalk.bold(app.get('port')),
    );
});