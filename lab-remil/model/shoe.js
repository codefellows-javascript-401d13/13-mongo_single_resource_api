'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = Promise;

const Shoe = Schema({
  model: { type: String, required: true },
  brand: { type: String, required: true },
  timestamp: { type: Date, required: true},
});

module.exports = mongoose.model('Shoe', Shoe);
