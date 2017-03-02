'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
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
  .then( food => res.json(food))
  .catch(next);
});

foodRouter.put('/api/food/:id', jsonParser, function(req, res, next) {
  Food.findByIdAndUpdate(req.params.id, { $set: { name: 'json bronn' }})
  .then( food => res.json(food))
  .catch(next);
});

foodRouter.delete('/api/food/id', function(req, res, next) {
  Food.findByIdAndDelete(req.params.id)
  .then( () => {
    res.status(204).end();
  })
  .catch(next);
});
