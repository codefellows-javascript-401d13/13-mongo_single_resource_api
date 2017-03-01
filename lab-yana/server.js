'use strict';

const PORT = 3003;
const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('mountains:server');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const mountainsRouter = require('./route/mountains-route.js');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mountainsapp';
const app = express();

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(cors); //cors needs to be above any routes calls in order to provide access to APIs
// app.use(mountainsRouter);
app.use(morgan('dev'));

app.listen(PORT, () => { debug(`server up ${PORT}`) });
