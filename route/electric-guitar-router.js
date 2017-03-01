'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('guitar:electric-guitar-router');
const ElecGuitar = require('../model/electric-guitar.js');

const elecGuitarRouter = module.exports = new Router();

elecGuitarRouter.post('/api/electric-guitar', jsonParser, function(req, res, next) {
  debug('POST: /api/electric-guitar');

  req.body.timestamp = new Date();
  new ElecGuitar(req.body).save()
  .then( elecGuitar => res.json(elecGuitar))
  .catch(next);
});

elecGuitarRouter.get('/api/electric-guitar/:id', function(req, res, next) {
  debug('GET: /api/electric-guitar/:id');

  ElecGuitar.findById(req.params.id)
  .then( elecGuitar => res.json(elecGuitar))
  .catch(next);
});

elecGuitarRouter.put('/api/electric-guitar/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/electric-guitar/:id');

  ElecGuitar.findByIdAndUpdate(req.params.id, req.body)
  .then( elecGuitar => res.json(elecGuitar))
  .catch(next);
});

elecGuitarRouter.delete('/api/electric-guitar/:id', function(req, res, next) {
  debug('DELETE: /api/electric-guitar/:id');

  ElecGuitar.findByIdAndRemove(req.params.id)
  .then( () => res.status(204).send('no content'))
  .catch(next);
});
