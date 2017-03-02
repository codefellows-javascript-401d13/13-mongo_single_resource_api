'use strict';
const
  express = require('express'),
  morgan = require('morgan'),
  cors = require('cors'),
  debug = require('debug')('employee:server'),
  Promise = require('bluebird'),
  mongoose = require('mongoose'),
  empRouter = require('./route/employee-route.js'),
  errors = require('./lib/error-middleware.js');

const
  app = express(),
  PORT =  process.env.PORT || 3000,
  MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/employeelist'


mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(empRouter);
app.use(errors);


app.listen(PORT, () => debug('SERVER UP AT ', PORT));
