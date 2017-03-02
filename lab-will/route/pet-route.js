'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Pet = require('../model/pet.js');
const createError = require('http-errors');
const petRouter = module.exports = new Router();

petRouter.post('/api/pet', jsonParser, function(req, res, next) {

  // console.log('===============');
  // console.log('req.body:', req.body);
  // console.log('===============');

  if(Object.keys(req.body).length === 0){
    next(createError(400, 'bad request'));
    return;
  }


  req.body.timestamp = new Date();
  new Pet(req.body).save()
  .then(pet => res.json(pet))
  .catch( err => next(err));
});

petRouter.get('/api/pet/:id', function(req, res, next) {
  Pet.findById(req.params.id)
  .then(pet => res.json(pet))
  .catch(next);
});

petRouter.put('/api/pet/:id', jsonParser, function(req, res, next) {
  Pet.findById(req.params.id)
  .then(pet => {
    for(var key in req.body){
      pet[key] = req.body[key];
    }
    res.json(pet);
  })
  .catch(next);
});

petRouter.delete('/api/pet/:id', function(req, res, next) {
  Pet.findByIdAndRemove(req.params.id)
  .then(pet => {
    res.json(pet);
  })
  .catch(next);});
