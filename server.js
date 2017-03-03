'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose  = require('mongoose');
const cors = require('cors');
const Promise = require('bluebird');
const debug = require('debug')('food:server');
const errors = require('./lib/error-middleware.js');

const foodRouter = require('./route/food-router.js');
const saladRouter = require('./route/salad-router.js');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/api/foodapp';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(foodRouter);
app.use(saladRouter);
app.use(errors);

app.listen(PORT, () => {
  debug(`server up on port: ${PORT}`);
  console.log(PORT);
});
