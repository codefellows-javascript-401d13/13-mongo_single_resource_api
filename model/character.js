'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = Schema({
  name: {type: String, required: true},
  weapon: {type: String, required: true},
  timestamp: {type: Date, required: true, default: Date.now()},
  showId: {type: Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('character', characterSchema);
