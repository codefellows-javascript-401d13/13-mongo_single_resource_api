'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Car = require('../model/car.js');
const debug = require('debug')('car:car-route ');
const carRouter = module.exports = new Router();
const createError = require('http-errors');

carRouter.post('/api/car', jsonParser, function(req, res, next){
  debug('POST: /api/car');
  req.body.timestamp = new Date();
  new Car(req.body).save()
  .then( car => res.json(car))
  .catch( err => next(err));
});

carRouter.get('/api/car/:id', function(req, res, next) {
  debug('GET: /api/car/:id');
  Car.findById(req.params.id)
  .then( car => res.json(car))
  .catch( err => next(createError(404, err.message)));
});

carRouter.put('/api/car/:id', jsonParser, function(req, res, next){
  debug('PUT: /api/car/:id');
  Car.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then( car => res.json(car))
  .catch( err => next(createError(404, err.message)));
});

carRouter.delete('/api/car/:id', function(req, res, next){
  debug('hit route DELETE /api/car/:id');
  Car.findByIdAndRemove(req.params.id)
  .then(() => res.status(204).send())
  .catch( err => next(createError(404, err.message)));
});
