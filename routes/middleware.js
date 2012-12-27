var _ = require('underscore');
var httpProxy = require('http-proxy');
var routingProxy = new httpProxy.RoutingProxy();

var middleware = module.exports;

middleware.yeomanProxy = function(req, res, next) {
  var pattern = /^(\/scripts\/*|(\/styles\/*)|(\/images\/*))/;
  var yeomanHost = 'localhost';
  var yeomanPort = 3501;
  if (req.url.match(pattern)) {
    console.log('YEOMAN PROXY PASS!');
    routingProxy.proxyRequest(req, res, {
      host: yeomanHost,
      port: yeomanPort
    });
  }
  else {
    next();
  }
};

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