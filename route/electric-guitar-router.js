'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('guitar:electric-guitar-router');
const createError = require('http-errors');
const ElecGuitar = require('../model/electric-guitar.js');

const elecGuitarRouter = module.exports = new Router();

elecGuitarRouter.post('/api/electric-guitar', jsonParser, function(req, res, next) {
  debug('POST: /api/electric-guitar');

  if(!req.body.name || !req.body.make) {
    return next(createError(400, 'bad request'));
  }
  req.body.timestamp = new Date();
  new ElecGuitar(req.body).save()
  .then( elecGuitar => res.json(elecGuitar))
  .catch( err => next(err));
});

elecGuitarRouter.get('/api/electric-guitar/:id', function(req, res, next) {
  debug('GET: /api/electric-guitar/:id');

  try {
    ElecGuitar.findById(req.params.id)
    .then( elecGuitar => res.json(elecGuitar))
    .catch( err => {
      createError(404, err.message);
      next(err);
    });
  } catch (err) {
    return createError(400, err.message);
  }
});

elecGuitarRouter.put('/api/electric-guitar/:id', jsonParser, function(req, res, next){
  debug('PUT: /api/electric-guitar/:id');

  if(!req.body.name || !req.body.make) {
    return next(createError(400, 'bad request'));
  }
  ElecGuitar.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then( elecGuitar => res.json(elecGuitar))
  .catch( err => {
    createError(404, err.message);
    next(err);
  });
});

elecGuitarRouter.delete('/api/electric-guitar/:id', function(req, res, next) {
  debug('DELETE: /api/electric-guitar/:id');

  try {
    ElecGuitar.findByIdAndRemove(req.params.id)
    .then( () => res.status(204).send('no content'))
    .catch( err => {
      createError(404, err.message);
      next(err);
    });
  } catch (err) {
    return createError(400, err.message);
  }
});
