'use strict';

const parseJSON = require('body-parser').json();
const Router = require('express').Router;
const Mountains = require('../model/mountains.js');
const debug = require('debug')('mountains:mountains-route');
const url = '/api/mountains';

const mountainsRouter = new Router;

mountainsRouter.post(url, parseJSON, function(req, res, next) {
  debug('POST /api/mountains');
  req.body.timestamp = new Date();
  new Mountains(req.body).save()
  .then(mountains => res.json(mountains))
  .catch(next);
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
  Mountains.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(mountain => res.json(mountain))
  .catch(next);
});

module.exports = mountainsRouter;
