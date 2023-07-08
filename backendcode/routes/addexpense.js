const express = require('express');
const routes = express.Router();
const add = require('../controller/add');

routes.post("/add-expense",add.addexpense);

routes.get("/get-expense",add.getexpense);

routes.delete("/delete-expense/:id",add.deleteexpense);

routes.delete("/edit-expense/:id",add.editexpense);

module.exports = routes;