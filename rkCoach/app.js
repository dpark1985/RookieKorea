var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var everyauth = require('everyauth');
var expressSession = require('express-session');
var RedisStore = require('connect-redis')(expressSession);
var redis = require('redis');


// import routes
var routes = require('./routes/index');
var customModel = require('./routes/utilities/customModel');
var users = require('./routes/users');

// EveryAuth Configuration
var customAuth = require('./routes/utilities/auth');


// SessionStore Redis
var client = redis.createClient();
process.on('exit', function(){ client.quit(); });
var options = { client: client }
var sessionStore = new RedisStore(options);


// MongoDB
var baseURL = 'rookiekorea';
var collections = ['users'];
var db = mongojs(baseURL, collections);


// create express application
var app = express();

// configure everyAuth
customAuth.active(everyauth, db);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'rookie',
    name: 'rookie',
    resave: true,
    saveUninitialized: true
}));
app.use(everyauth.middleware(app));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    req.db = db;
    next();
});


// actual routers
app.use('/', routes);
app.use('/customModel', customModel);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
