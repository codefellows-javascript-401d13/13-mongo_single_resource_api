'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Videogame = require('../model/videogame.js');
const debug = require('debug')('videogame:videogame-route')
const videogameRouter = module.exports = new Router();

videogameRouter.post('/api/videogame', jsonParser, function(req, res, next) {
    debug('POST: /api/videogame');

    req.body.timestamp = new Date();
    new Videogame(req.body).save()
    .then(videogame => res.json(videogame))
    .catch(next);
});

videogameRouter.get('/api/videogame/:id', function(req, res, next) {
    debug('GET: /api/videogame/:id');

    Videogame.findById(req.params.id)
    .then(videogame => res.json(videogame))
    .catch(next);
});

videogameRouter.put('/api/videogame/:id', jsonParser, function(req, res, next) {
    debug('PUT: /api/videogame/:id');

    Videogame.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then( videogame => res.json(videogame))
    .catch(next);
});

videogameRouter.delete('/api/videogame/:id', function(req, res, next) {
    debug('DELETE: /api/delete/:id');

    Videogame.findByIdAndRemove(req.params.id)
    .then( () => res.status(204).send())
    .catch(next);    
});