const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./src/controllers/userController');
const authMiddleware = require('./src/middleware/authMiddleware');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(authMiddleware);

// Routes
app.use('/', userController);

module.exports = app;