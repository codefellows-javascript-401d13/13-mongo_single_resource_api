'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('food:food-router');

const Food = require('../model/food.js');
const foodRouter = module.exports = new Router();

foodRouter.post('/api/food', jsonParser, function(req, res, next) {
  req.body.timestamp = new Date();
  new Food(req.body).save()
  .then( food => res.json(food))
  .catch(next);
});

foodRouter.get('/api/food/:id', function(req, res, next) {
  Food.findById(req.params.id)
  .populate('salads')
  .then( food => res.json(food))
  .catch( err => next(createError(404, err.message)));
});

foodRouter.put('/api/food/:id', jsonParser, function(req, res, next) {
  Food.findByIdAndUpdate(req.params.id, req.body, { new: true})
  .then( food => res.json(food))
  .catch( err => {
    if (err.name === 'ValidationError') return next(err);
    next(createError(404, err.message));
  });
});

foodRouter.delete('/api/food/:id', function(req, res, next) {
  Food.findByIdAndRemove(req.params.id)
  .then( () => {
    res.status(204).end();
  })
  .catch( err => next(createError(404, err.message)));
});
