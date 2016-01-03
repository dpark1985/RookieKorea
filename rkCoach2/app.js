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
var urlencode = require('urlencode');
var schedule = require('schedulejs');
var later = require('later');
var crypto = require('crypto');
var base64Img = require('base64-img');

// import routes
var routes = require('./routes/index');
var getData = require('./routes/utilities/getData');
var setData = require('./routes/utilities/setData');
var search = require('./routes/search');


// EveryAuth Configuration
var customAuth = require('./routes/utilities/auth');


// SessionStore Redis
var client = redis.createClient();
process.on('exit', function(){ client.quit(); });
var options = { client: client }
var sessionStore = new RedisStore(options);


// MongoDB
var baseURL = 'rookiekorea';
var collections = ['users', 'coachs'];
var db = mongojs(baseURL, collections);


// create express application
var app = express();


// configure everyAuth
customAuth.active(everyauth, db, crypto);
//everyauth.helpExpress(app); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
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
app.use(function (req, res, next) {
    req.urlencode = urlencode;
    next();
});
app.use(function (req, res, next) {
    req.base64Img = base64Img;
    next();
});


// actual routers
app.use('/', routes);
app.use('/getData', getData);
app.use('/setData', setData);
app.use('/search', search);


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
