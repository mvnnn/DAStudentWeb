var http=require ('http');
var port=process.env.PORT || 3000 ;
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var authenticate = require('./routes/authenticate');
// var admin = require('./routes/admin');

var Home = require('./routes/private/Home');
var MyProfile = require('./routes/private/MyProfile');
var MyCourses = require('./routes/private/MyCourses');
var Queires = require('./routes/private/Queires');
var Repository = require('./routes/private/Repository');
var Navbar = require('./routes/private/Navbar');


//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
    next();
}

var app = express();
var methodOverride = require('method-override');

app.use(logger('dev'));

app.use(allowCrossDomain);
app.set('view engine', 'ejs');
app.use(favicon(path.join('public','bb.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
var methodOverride = require('method-override');
app.use(express.static(path.join(__dirname, 'public')));
app.set('x-powered-by',false);

// private routes
app.get('/Home', Home.home);
app.get('/MyProfile', MyProfile.myProfile);
app.get('/MyCourses', MyCourses.myCourses);
app.get('/Queires', Queires.queires);
app.get('/Repository', Repository.repository);

app.get('/Preferences', Navbar.preferences);
app.get('/ChangePass', Navbar.changePass);
app.get('/Help', Navbar.help);
app.get('/Logout', Navbar.logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    response: 'error',
    message: err.message,
    data: (app.get('env') === 'development') ? err : {}
  });
});

http.createServer(app).listen(port);
console.log('port listen at :'+ Number(port));
// module.exports = app;
