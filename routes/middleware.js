var _ = require('underscore');

var middleware = module.exports;

middleware.expressLogger = function(req, res, next) {
  console.log('--->');
  console.log('%s - %s', req.method, req.url);
  if (!_.isEmpty(req.body)) {
    console.log(JSON.stringify(req.body));
  }
  if (!_.isEmpty(req.query)) {
    console.log(JSON.stringify(req.query));
  }
  console.log('---<');
  next();
};

middleware.respond = require('./respond');