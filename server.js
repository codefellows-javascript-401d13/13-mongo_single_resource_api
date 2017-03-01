'use strict';

const express = require('express');
const debug = require('debug')('card:server');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const cardRouter = require('./route/card-route.js');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/cardapp';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(cardRouter);

app.listen(PORT, () => {
  debug(`Server's up on port: ${PORT}`);
});
