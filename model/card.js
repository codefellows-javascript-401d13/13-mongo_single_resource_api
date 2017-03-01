'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  brand: { type: String, required: true},
  set: { type: Boolean, required: true},
  single: {type: Boolean, required: true}
});

module.exports = mongoose.model('card', cardSchema);
