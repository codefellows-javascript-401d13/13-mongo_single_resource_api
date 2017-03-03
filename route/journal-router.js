'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Journal = require('../model/journal.js');
const debug = require('debug')('journal:journal-router');
const createError = require('http-errors');

const journalRouter = module.exports = new Router();

journalRouter.post('/api/journal', jsonParser, function(req, res, next){
  req.body.timestamp = new Date();
  new Journal(req.body).save()
  .then( journal => res.json(journal))
  .catch(err => next(createError(400, err.message)));
});

journalRouter.get('/api/journal/:id', function(req, res, next) {
  Journal.findById(req.params.id)
  .then( journal => res.json(journal))
  .catch(err => next(createError(404, err.message)));
});

journalRouter.put('/api/journal/:id', jsonParser, function(req, res, next) {
  // debug('PUT: api/jounral/:id');
  Journal.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then( journal => res.json(journal))
  .catch(err => next(createError(404, err.message)));
});

journalRouter.delete('/api/journal/id', function(req, res, next) {
  // debug('DELETE: api/journal/:id');
  Journal.findByIdAndDelete(req.params.id)
  .then( () => res.status(204).send())
  .catch(err => next(createError(404, err.message)));
});
