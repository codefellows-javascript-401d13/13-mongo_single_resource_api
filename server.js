'use strict';

const express = require('express');
const debug = require('debug')('guitar:server');
const morgan = require('morgan');
const Promise = require('bluebird');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/test_app';

app.use(cors);
app.use(morgan('dev'));


app.listen(PORT, () =>{
  debug(`Port is lit yo: ${PORT}`);
});
