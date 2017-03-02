'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = Schema ({
  name: { type: String, required: true },
  subject: { type: String, required: true},
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('journal', journalSchema)
