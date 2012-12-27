var helpers = require('../core').helpers;

module.exports.express = function(req, res, next) {
  res._json = res.json;
  res.json = function(){
      var args = Array.prototype.slice.apply(arguments);
      var statusCode, json;

      if (typeof args[0] == 'number') {
        statusCode = args.shift();
      }

      if (args[0] instanceof Error) {
        //f(error)
        statusCode = statusCode || 400;
        json       = { error: args[0] };
        args       = [statusCode, json];
      }
      else if (!helpers.exists(args[0]) && args[1]) {
        //f(nullOrUndefined, data)
        statusCode = statusCode || 200;
        json       = args[1];
        args       = [statusCode, json];
      }
      else {
        //f(status, data)
        args = arguments;
      }

      if (process.env.NODE_ENV == 'development') {
        console.log('<res.json>');
        console.log(args);
        if (args[0] && args[0].extra) {
          console.log(args[0].extra);
        }
        if (args[1] && args[1].extra) {
          console.log(args[1].extra);
        }
        console.log('<res.json>');
      }

      res._json.apply(res, args);
  };

  next();
};
