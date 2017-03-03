'use strict';

const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const saladSchema = Schema({
  name: {type: String, required: true},
  dressing: {type: String, required: true},
  timestamp: {type: Date, required: true},
  foodID: {type: Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('salad', saladSchema);
