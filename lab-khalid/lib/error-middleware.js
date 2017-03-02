const createError = require('http-errors');
const debug = require('debug')('employee:error-middleware');

module.exports = function(err, req, res, next){
  debug('error-middleware');
  if(err.status){
    debug('User error');
    res.status(err.message).send(err.message);
    next();
    return;
  }
  debug('Server error');
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
}
