'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = Schema({
  brand: { type: String, required: true},
  completeSet: { type: Boolean, required: true},
  single: {type: Boolean, required: true}
});

module.exports = mongoose.model('card', cardSchema);
