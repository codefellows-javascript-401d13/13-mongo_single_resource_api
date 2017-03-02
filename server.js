'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const debug = require('debug')('journal:server');
const mongoose = require('mongoose');
const journalRouter = require('./route/journal-router.js');

const app = express();
const PORT = process.env.PORT || 3000;

const MONGODB_URI =  process.env.MONGODB_URI || 'mongodb://localhost/journalappdev'

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(journalRouter);

app.listen(PORT, () => {
  debug(`server is up yo: ${PORT}`);
});
