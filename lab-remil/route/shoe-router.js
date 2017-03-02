'use strict';

const debug = require('debug')('shoe:shoe-router');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();

const Shoe = require('../model/shoe.js');
const shoeRouter = module.exports = new require('express').Router();

shoeRouter.post('/api/shoe', jsonParser, function(req, res, next) {
  debug('POST: /api/shoe');

  if (!req.body.model) return next(createError(400, 'expected model'));
  if (!req.body.brand) return next(createError(400, 'expected brand'));

  req.body.timestamp = new Date();
  new Shoe(req.body).save()
  .then( shoe => res.json(shoe))
  .catch(next);
});
