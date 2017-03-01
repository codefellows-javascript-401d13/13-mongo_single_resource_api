'use strict';

const express = require('express');
const debug = require('debug')('guitar:server');
const morgan = require('morgan');
const Promise = require('bluebird');
const cors = require('cors');
const mongoose = require('mongoose');

const elecGuitarRouter = require('./route/electric-guitar-router.js');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/test_app';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));

app.use(elecGuitarRouter);

app.listen(PORT, () =>{
  debug(`Port is lit yo: ${PORT}`);
});
