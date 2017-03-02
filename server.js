'use strict';

const express = require('express');
const Promise = require('bluebird');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const debug = require('debug')('show:server');
const showRouter = require('./route/show-router.js');

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/showtest';

mongoose.promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(showRouter);

app.listen(PORT, function(){
  debug(`server up on ${PORT}`);
});
