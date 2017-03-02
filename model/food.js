'use strict';

const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = Schema({
  name: {type: String, required: true},
  meal: {type: String, required: true},
  timestamp: {type: Date, required: true}
});

module.exports = mongoose.model('food', foodSchema);
