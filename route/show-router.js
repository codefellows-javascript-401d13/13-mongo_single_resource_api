'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Show = require('../model/show.js');
const debug = require('debug')('show:show-router');
const showRouter = module.exports = new Router();

showRouter.post('/api/show', jsonParser, function(req, res, next){
  debug('POST : showRouter');
  req.body.timestamp = new Date();
  new Show(req.body).save()
  .then(data => res.json(data))
  .catch(next);
});

showRouter.get('/api/show/:id', function(req, res, next){
  debug('GET: showRouter');
  Show.findById(req.params.id)
  .then(show => res.json(show))
  .catch(next);
});

showRouter.put('/api/show/:id', jsonParser, function(req, res, next){
  debug('PUT: showRouter');
  Show.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(show => res.json(show))
  .catch(next);
});

showRouter.delete('/api/show/:id', function(req, res, next){
  debug('Delete: showRouter');
  Show.findByIdAndRemove(req.params.id)
  .then(show => res.json(show))
  .catch(next);
});
