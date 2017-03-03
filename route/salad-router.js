'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('food:food-router');
const Food = require('../model/food.js');
const saladRouter = module.exports = new Router();

saladRouter.post('.api/food/:foodID/salad',jsonParser, function(req, res, next) {
  Food.findByIdAndAddSalad(req.params.foodID, req.body)
  .then( salad => res.json(salad))
  .catch(next);
});
