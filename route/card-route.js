'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Card = require('../model/card.js');
const debug = require('debug')('card:card-route');
const createError = require('http-errors');

const cardRouter = module.exports = new Router();

cardRouter.post('/api/card', jsonParser, function(req, res, next) {
  debug('POST: api/card');

  if (Object.keys(req.body).length === 0) {
    return next(createError(400));
  }

  new Card(req.body).save()
  .then( card => res.json(card))
  .catch(next);
});

cardRouter.get('/api/card/:_id', function(req, res, next) {
  debug('GET: api/card/:_id');

  Card.findById(req.params._id)
  .then( card => {
    if (!card) {
      return next(createError(404));
    }
    res.json(card);
  })
  .catch(next);
});

cardRouter.put('/api/card/:_id', jsonParser, function(req, res, next) {
  debug('POST: api/card/:_id');

  if (Object.keys(req.body).length === 0 || (!req.params._id)) {
    return next(createError(400));
  }

  Card.findByIdAndUpdate(req.params._id, req.body, { new: true })
  .then( update => {
    if (!update) {
      return next(createError(404));
    }
    res.json(update);
  })
  .catch(next);
});

cardRouter.delete('/api/card/:_id', function(req, res, next) {
  debug('DELETE: api/card/:_id');

  if (!req.params._id) {
    return next(createError(400));
  }

  Card.findByIdAndRemove(req.params._id)
  .then( discarded => {
    if (!discarded) {
      return next(createError(404));
    }
    res.json(discarded);
  })
  .catch(next);
});

cardRouter.get('/api/card', function(req, res, next) {
  debug('GET: api/card');

  Card.find({})
  .then( cards => {
    console.log('cards', cards);
  })
  .catch(next);
});
