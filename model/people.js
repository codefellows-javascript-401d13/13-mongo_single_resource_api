'use strict';

const mongoose = require('mongoose');
const Promise = require('bluebird');
const Schema = mongoose.Schema;


const peopleSchema = Schema({
  name: { type: String, required: true},
  timestamp: { type: Date, required: true}
});

mongoose.Promise = Promise;

module.exports = mongoose.model('people', peopleSchema);
