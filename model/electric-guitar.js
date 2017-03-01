'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.schema;

const elecGuitarSchema = Schema({
  name: { type: String, required: true},
  make: { type: String, required: true},
  timestamp: { type: Date, required: true}
});

module.exports = mongoose.model('electric-guitar', elecGuitarSchema);
