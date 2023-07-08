const express = require('express');
const routes = express.Router();
const add = require('../controller/login');

routes.post('/login',add.login);

module.exports = routes;