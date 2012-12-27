var helpers = require('../core').helpers;

module.exports.express = function(req, res, next) {
  res.pond = function(errorStatusCode){
    return function() {
      if (arguments[0] instanceof Error) {
        //f(error)
        args = [errorStatusCode||400, arguments[0]];
      }
      else if (!helpers.exists(arguments[0]) && arguments[1]) {
        //f(nullOrUndefined, data)
        args = [arguments[1]];
      }
      else {
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
      res.json.apply(res, args);
    };
  };

  next();
};
