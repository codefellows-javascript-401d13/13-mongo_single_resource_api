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
    debug('POST without body');

    let err = createError(400);
    res.status(err.status).send(err.name);
    return next();
  }

  new Card(req.body).save()
  .then( card => res.json(card))
  .catch(next);
});

cardRouter.get('/api/card/:id', function(req, res, next) {
  debug('GET: api/card');
  console.log(req.params.id);
  Card.findById(req.params.id)
  .then( card => {
    if (!card) {
      let err = createError(404);
      res.status(err.status).send(err.name);
      return next();
    }
    res.json(card);
  })
  .catch(next);
});
