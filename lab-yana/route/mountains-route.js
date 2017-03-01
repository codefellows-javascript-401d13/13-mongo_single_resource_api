'use strict';

const parseJSON = require('body-parser').json();
const Router = require('express').Router;
const Mountains = require('../model/mountains.js');
const debug = require('debug')('mountains:mountains-route');
const url = 'api/mountains';

const mountainsRouter = new Router;

mountainsRouter.post(url, parseJSON, function(req, res, next) {
  debug('POST api/mountains');
  req.body.timestamp = new Date();
  new Mountains(req.body).save()
  .then(mountains => res.json(mountains))
  .catch(next);
});

mountainsRouter.get(`${url}/:id`, function(req, res, next) {
  debug('GET api/mountains/:id');
  Mountains.findById(req.params.id)
  .then(mountain => res.json(mountain))
  .catch(next);
});

mountainsRouter.delete(`${url}/:id`, function(req, res, next) {
  debug('DELETE api/mountains/:id');
  Mountains.findById(req.params.id)
  .then(mountain => { Mountains(mountain).remove({}); })
  .catch(next);
});

mountainsRouter.put(`${url}/:id`, function(req, res, next) {
  debug('PUT: api/mountains/:id');
  var newInfo = req.body; //assign the info to update the entry with to a new object (optional)
  Mountains.findById(req.params.id) //find the entry by the id that the user provides
  .then(mountain => {
    for (var property in mountain) {
      if (newInfo.property) Mountains(mountain).update({ $set: { property: newInfo.property }}); //check if the user sent new info for each property, then update the appropriate property in the database with the new stuff, otherwise property doesn't change
    }
  })
  .catch(next);
});

module.exports = mountainsRouter;
