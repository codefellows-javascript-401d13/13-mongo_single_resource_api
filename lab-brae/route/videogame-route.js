'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Videogame = require('../model/videogame.js');
const videogameRouter = module.exports = new Router();

videogameRouter.post('/api/videogame', jsonParser, function(req, res, next) {
    req.body.timestamp = new Date();
    new Videogame(req.body).save()
    .then(videogame => res.json(videogame))
    .catch(next);
});

videogameRouter.get('/api/videogame/:id', function(req, res, next) {
    Videogame.findById(req.params.id)
    .then(videogame => res.json(videogame))
    .catch(next);
});