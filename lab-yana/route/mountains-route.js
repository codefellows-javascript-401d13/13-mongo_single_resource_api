'use strict';

const parseJSON = require('body-parser').json();
const Router = require('express').Router;
const Mountains = require('../model/mountains.js');
const debug = require('debug')('mountains:mountains-route');
const url = '/api/mountains';
const Promise = require('bluebird');
const createError = require('http-errors');

const mountainsRouter = new Router;

//.catch(next) will send the erroneous id errors in all methods to the error-middleware for handling

mountainsRouter.post(url, parseJSON, function(req, res, next) {
  debug('POST /api/mountains');
  req.body.timestamp = new Date();
  new Mountains(req.body).save()
  .then(mountains => res.json(mountains))
  .catch(next); //also catches if there is no valid request body
});

mountainsRouter.get(`${url}/:id`, function(req, res, next) {
  debug('GET /api/mountains/:id');
  Mountains.findById(req.params.id)
  .then(mountain => res.json(mountain))
  .catch(next);
});

mountainsRouter.delete(`${url}/:id`, function(req, res, next) {
  debug('DELETE /api/mountains/:id');
  Mountains.findByIdAndRemove(req.params.id)
  .then(result => res.json(result))
  .catch(next);
});

mountainsRouter.put(`${url}/:id`, parseJSON, function(req, res, next) {
  debug('PUT: /api/mountains/:id');
  if (req._body !== true) var invalidBody = true;
  req.body.timestamp = new Date();
  Mountains.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(mountain => {
    if (invalidBody) return Promise.reject(createError(400, 'bad request')); //while all other errors are "caught" and handled with the error-middleware, this one is not because the object is "updated" regardless of whether or not any new info is added to it, therefore passing a 200 status code regardless of the contents(or lack thereof) of the body.
    res.json(mountain);
  })
  .catch(next);
});

module.exports = mountainsRouter;
