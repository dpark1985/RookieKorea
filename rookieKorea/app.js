var debug = require('debug')('rookieKorea:server');
var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var multer  = require('multer');

//var customAuth = require('./routes/auth');
//var customGlobal = require('./routes/global');
//var customMain = require('./routes/index');

// DataBase connection
var baseURI = "52.69.2.200/test1";
var collections = ["users", "competitions", "courts", "clubs"];
var db = mongojs.connect(baseURI, collections);

// twilio 
var accountSid = 'ACd7d3da33d39966f60f6ff351531be9a7'; 
var authToken = '409696dc93ab033c84ae49af94bf844c'; 
var twilioClient = require('twilio')(accountSid, authToken); 

// import Routes
var webApp = require('./routes/index');
var hybridApp = require('./routes/happ');

// create Server
var app = express();
var server = http.createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/assets/img/favicons/favicon.ico'));
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(function (req, res, next) {
    req.db = db;
    next();
});
app.use(function (req, res, next) {
    req.twilio = twilioClient;
    next();
});
app.use(
    multer({ 
        dest: './public/uploads/',
        rename: function (fieldname, filename) {
            return Date.now()+'_'+filename;
        },
        onFileUploadStart: function (file) {
            console.log(file.originalname + ' is starting ...')
        },
        onFileUploadComplete: function (file) {
            console.log(file.fieldname + ' uploaded to  ' + file.path)
            done=true;
        }
    })
);


app.use('/', webApp);
//customMain.active(app, db);
app.use('/happ', hybridApp);



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



// execute Server
server.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
