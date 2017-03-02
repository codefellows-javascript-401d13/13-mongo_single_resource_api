'use strict';

const debug = require('debug')('shoe:server');
const cors = require('cors');
const morgan = require('morgan');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const app = require('express')();

const errors = require('./lib/error-middleware.js');
const shoeRouter = require('./route/shoe-router.js');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/shoedev';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));

app.use(shoeRouter);

app.use(errors);

app.listen(PORT, () => debug(`Servin' it up on: ${PORT}`));
