var express    = require('express');
var app        = express();
// var mongoose   = require('mongoose');
// var cookies    = require('cookies');
// var hbs        = require('hbs');
// require('./static/hbsHelpers')(hbs);

var routes     = require('./routes');
var router     = routes.router;
var middleware = routes.middleware;

var config;
switch(process.env.NODE_ENV) {
  case 'development':
    config = {
      port: process.env.PORT || 5000
    };
    break;
  case 'production':
    config = {
      port: process.env.PORT
    };
    break;
  default:
    throw new Error("Unexpected NODE_ENV value, '"+process.env.NODE_ENV+"'");
}

app.configure('development', function() {
  app.use(express['static'](__dirname + '/static'));
  app.use(middleware.expressLogger);
  app.use(express.bodyParser());
  // app.use(cookies.express());
  // app.use(express.cookieSession(session));
  app.use(middleware.respond.express);
  // app.set('views', __dirname + '/static/app/templates');
  // app.set("view options", { layout: false });
  // app.set('view engine', 'html');
  // app.engine('html', hbs.__express);
});

app.configure('production', function() {
  app.use(express['static'](__dirname + '/static'));
  app.use(middleware.expressLogger);
  app.use(express.bodyParser());
  // app.use(cookies.express());
  // app.use(express.cookieSession(session));
  app.use(middleware.respond.express);
  // app.set('views', __dirname + '/static/dist');
  // app.set("view options", { layout: false });
  // app.set('view engine', 'html');
  // app.engine('html', hbs.__express);
});

//routes
router(app);

console.log('Express listening on port', config.port, '-', process.env.NODE_ENV);
app.listen(config.port);