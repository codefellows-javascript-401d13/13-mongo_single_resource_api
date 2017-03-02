'use strict';

const mongoose = require('mongoose');
const debug = require('debug')('employee:employee');

const employeeSchema = mongoose.Schema({
  name: { type: String, required: true },
  timestamp : { type: Date, required: true}
});
debug('employee.js');
module.exports = mongoose.model('employee', employeeSchema);
