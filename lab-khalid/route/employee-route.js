'use strict';

const
  Router = require('express').Router,
  jsonParser = require('body-parser').json(),
  Employee = require('../model/employee.js'),
  debug = require('debug')('employee:employee-route'),
  createError = require('http-errors'),
  empRouter = module.exports = new Router();

empRouter.post('/api/employee', jsonParser, function(req, res, next){
  debug('empRouter.post');
  req.body.timestamp = new Date();
  new Employee(req.body).save()
  .then(employee => res.json(employee))
  .catch(next);
});

empRouter.get('/api/employee/:id', function(req, res, next){
  debug('empRouter.get');
  Employee.findById(req.params.id)
  .then(employee => res.json(employee))
  .catch(next);
});

empRouter.put('/api/employee/:id',jsonParser, function(req, res, next){
  debug('empRouter.put');
  if(!req.body) return createError(400, 'Bad request');
  Employee.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(employee => res.send(employee))
  .catch(next);
});

empRouter.delete('/api/employee/:id', function(req, res, next){
  debug('empRouter.delete');
  Employee.findByIdAndRemove(req.params.id, req.body)
  .then(employee => res.json(employee))
  .catch(next);
});
