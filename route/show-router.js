'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Show = require('../model/show.js');
const debug = require('debug')('show:show-router');
const showRouter = module.exports = new Router();
const createError = require('http-errors');

showRouter.post('/api/show', jsonParser, function(req, res, next){
  debug('POST : showRouter');
  req.body.timestamp = new Date();
  if(!req.body.name) return next(createError(400, 'bad request'));
  new Show(req.body).save()
  .then(data => res.json(data))
  .catch(next);
});

showRouter.get('/api/show/:id', function(req, res, next){
  debug('GET: showRouter');
  Show.findById(req.params.id)
  .populate('characters')
  .then(show => res.json(show))
  .catch(err => {
    if(err.name === 'CastError') {
      err = createError(404, 'invalid id');
    }
    next(err);
  });
});

showRouter.put('/api/show/:id', jsonParser, function(req, res, next){
  debug('PUT: showRouter');
  if(!req.body.name) return next(createError(400, 'bad request'));
  Show.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(show => res.json(show))
  .catch(() => {
    next();
  });
});

showRouter.delete('/api/show/:id', function(req, res, next){
  debug('Delete: showRouter');
  Show.findByIdAndRemove(req.params.id)
  .then(show => res.json(show))
  .catch(next);
});
