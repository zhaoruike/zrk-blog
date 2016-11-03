var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./db');

var settings = require('./setting');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


var routes = require('./routes/index');
var users = require('./routes/users');
var user=require('./routes/user');
var article=require('./routes/articles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: settings.cookieSecret,//secret 用来防止篡改 cookie
  //key: settings.db,//key 的值为 cookie 的名字
  //设定 cookie 的生存期，这里我们设置 cookie 的生存期为 30 天
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},
  resave:true,
  saveUninitialized:true,
  //设置它的 store 参数为 MongoStore 实例，把会话信息存储到数据库中，
  //以避免重启服务器时会话丢失
  //store: new MongoStore({
  //  db: settings.db,
  //  host: settings.host,
  //  port: settings.port,
  //})
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);
app.use('/user',user);
app.use('/article',article);

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
