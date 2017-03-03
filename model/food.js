'use strict';

const mongoose  = require('mongoose');
const createError  = require('http-errors');
const debug  = require('debug')('food:food');
const Schema = mongoose.Schema;

const Salad = require('./salad.js');

const foodSchema = Schema({
  name: {type: String, required: true},
  meal: {type: String, required: true},
  timestamp: {type: Date, required: true},
  salads : [{ type: Schema.Types.ObjectId, ref:'salad'}]
});

const Food = module.exports = mongoose.model('food', foodSchema);

Food.findByIdAndAddSalad = function(id, salad) {
  debug('findByIdAndAddSalad');

  return Food.findById(id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( food => {
    salad.foodId = food._id;
    this.tempFood = food;
    salad.timestamp = new Date();
    return new Salad(salad).save();
  })
  .then( salad => {
    this.tempFood.salads.push(salad._id);
    this.tempSalad = salad;
    return this.tempFood.save();
  })
  .then( () => {
    return this.tempSalad;
  });
};
