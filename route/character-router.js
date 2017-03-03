'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Show = require('../model/show.js');
const Character = require('../model/character.js');
const debug = require('debug')('show:character-router');
const characterRouter = module.exports = new Router();
const createError = require('http-errors');

characterRouter.post('/api/show/:showId/character', jsonParser, function(req, res, next) {
  debug('characterRouter');
  if(!req.body.name || !req.body.weapon) return next(createError(400, 'expected name and weapon'));
  Show.findByIdAndAddCharacter(req.params.showId, req.body)
  .then( character => res.json(character))
  .catch(next);
});

characterRouter.get('/api/character/:id', function(req, res, next){
  debug('GET: characterRouter');
  console.log('get happens');
  Character.findById(req.params.id)
  .then(character => res.json(character))
  .catch(err => {
    if(err.name === 'CastError') {
      err = createError(404, 'invalid id');
    }
    next(err);
  });
});

characterRouter.put('/api/character/:id', jsonParser, function(req, res, next){
  debug('PUT: characterRouter');
  if(!req.body.name) return next(createError(400, 'expected body'));
  if(!req.body.weapon) return next(createError(400, 'expected weapon'));
  Character.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(character => res.json(character))
  .catch(err => {
    if(err.name === 'CastError') {
      err = createError(404, 'invalid id');
    }
    next(err);
  });
});

characterRouter.delete('/api/character/:characterId', function(req, res, next){
  debug('Delete: Character Router');
  Show.findByIdAndRemoveCharacter(req.params.id)
  .then(() => res.status(204).send())
  .catch(err => next(createError(404, err.message)));
});
