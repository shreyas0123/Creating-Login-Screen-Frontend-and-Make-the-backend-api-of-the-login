const express = require('express');
const routes = express.Router();
const addsignupDB = require('../controller/signup');

routes.post('/adduser-DB',addsignupDB.adduserDB);

module.exports = routes;