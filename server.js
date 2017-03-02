'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
//debug: internal testing tool
const debug = require('debug')('car:server');
const mongoose = require('mongoose');
const carRouter = require('./route/car-route.js');
const error = require('./lib/error-middleware.js');

const app = express();

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/carappdev';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
//cors for allowing access
app.use(cors());
app.use(morgan('dev'));
app.use(carRouter);
app.use(error);

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);



});
