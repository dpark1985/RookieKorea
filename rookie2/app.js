
//모듈 추출
var debug = require('debug')('RookeiKorea:server');
var http = require('http');
var nconf = require('nconf');
var mongojs = require('mongojs');
var everyauth = require('everyauth');
var socket_io = require('socket.io');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var session = require('express-session')
var RedisStore = require('connect-redis')(session);
var redis = require('redis');
var fs = require('fs');
var multer  = require('multer');
var cors = require('cors');
var nodemailer = require('nodemailer');
var base64Img = require('base64-img');



// import Custom utilities
var customGlobal = require('./routes/utilities/global');
var customAuth = require('./routes/utilities/auth');

// import Custom Routes
var customView = require('./routes/customView');
var customModel = require('./routes/customModel');


console.log('========teting==========');
//console.log(db.getCollectionNames());

// DataBase connection
var baseURI = "52.69.2.200/rookiekorea";
//var baseURI = 'test3';
//var baseURI = "rookiekorea";
var collections = ["rejects", "noti", "query", "users", "competitions", "courts", "clubs"];
var db = mongojs.connect(baseURI, collections);
var client = redis.createClient();

process.on('exit', function(){
    client.quit();
});

var options = { client: client }

//세션 저장소를 생성
var sessionStore = new RedisStore(options);

// twilio 
var accountSid = 'ACd7d3da33d39966f60f6ff351531be9a7'; 
var authToken = '409696dc93ab033c84ae49af94bf844c'; 
var twilioClient = require('twilio')(accountSid, authToken); 

//nconf 파일 설정
nconf.file('config.json');

//서버 생성
var app = express();
var server = http.createServer(app);

//소켓 서버 생성
var io = socket_io.listen(server);
io.set('log level', 2);

//하이브리드 라우팅
var hybridApp = require('./routes/happ');

//기본 모듈 실행
customGlobal.active(nconf);
customAuth.active(everyauth, db);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicons/favicon.ico'));
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
//app.use(bodyParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('your secret here'));
app.use(session());
app.use(everyauth.middleware(app));
app.use(router);
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    req.db = db;
    next();
});
app.use(function (req, res, next) {
    req.nodemailer = nodemailer;
    next();
});
app.use(function (req, res, next) {
    req.fs = fs;
    next();
});
app.use(function (req, res, next) {
    req.twilio = twilioClient;
    next();
});
app.use(function (req, res, next) {
    req.base64Img = base64Img;
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

//소켓 서버 생성
var io = socket_io.listen(server);
io.set('log level', 2);



app.use('/happ', hybridApp);
customModel.active(app, db, fs);
customView.active(app, db, fs);







// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('error404', {
        message: err.message,
        error: {}
    });
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

//서버를 실행합니다.
server.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});
