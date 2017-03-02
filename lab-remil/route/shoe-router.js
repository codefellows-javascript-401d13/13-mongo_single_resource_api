'use strict';

const debug = require('debug')('shoe:shoe-router');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();

const Shoe = require('../model/shoe.js');
const shoeRouter = module.exports = new require('express').Router();

shoeRouter.get('/api/shoe/:id', function(req, res, next) {
  debug('GET: /api/shoe/:id');

  Shoe.findById(req.params.id)
  .then( shoe => res.json(shoe))
  .catch( err => {
    if (err.kind === 'ObjectId' && err.name === 'CastError') err = createError(404, err.message);

    next(err);
  });
});

shoeRouter.get('/api/shoe', function(req, res, next) {
  debug('GET: /api/shoe');

  Shoe.find({})
  .then( shoes => res.json(shoes))
  .catch(next);
});

shoeRouter.post('/api/shoe', jsonParser, function(req, res, next) {
  debug('POST: /api/shoe');

  if (!req.body.model) return next(createError(400, 'expected model'));
  if (!req.body.brand) return next(createError(400, 'expected brand'));

  req.body.timestamp = new Date();
  new Shoe(req.body).save()
  .then( shoe => res.json(shoe))
  .catch(next);
});


shoeRouter.put('/api/shoe/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/shoe/:id');

  if (!req.params.id) return next(createError(400, 'expected id'));
  if (Object.keys(req.body).length === 0) return next(createError(400, 'expected request body'));

  console.log('req body:', req.body);

  req.body.timestamp = new Date();
  Shoe.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then( shoe => res.json(shoe))
  .catch( err => {
    if (err.kind === 'ObjectId' && err.name === 'CastError') err = createError(404, err.message);

    next(err);
  });
});

shoeRouter.delete('/api/shoe/:id', function(req, res, next) {
  debug('DELETE: /api/shoe/:id');

  if (!req.params.id) return next(createError(400, 'expected id'));

  Shoe.findByIdAndRemove(req.params.id)
  .then( () => {
    res.sendStatus(204);
  })
  .catch(next);
});
