'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showSchema = Schema({
  name: {type: String, required: true},
  timestamp: {type: Date, required: true, default: Date.now()}
});

module.exports = mongoose.model('show', showSchema);
