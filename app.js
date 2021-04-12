var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var authenticate = require('./authenticate');
//Loads the handlebars module
const handlebars = require('express-handlebars');
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
//import cors from 'cors';
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

//datapassword
var pw = encodeURIComponent('pw#321');

//database name
var dbName = '';
var dbConnection = mongoose.connection;

var connectStr = 'mongodb+srv://srrAdmin:'+pw+'@cluster0.aokyl.mongodb.net/insomnia';

//mongo connection
mongoose.Promise = global.Promise;

try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      connectStr,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
  }
/*mongoose.connect(
	//'mongodb://localhost/' + dbName,
	connectStr,
{
	useNewUrlParser: true, 
	useUnifiedTopology: true
});*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//add handlebars
app.engine('hbs', handlebars({
	layoutsDir: __dirname + '/views/layouts',
	partialsDir: __dirname + '/views/partials',
	//new configuration parameter
	extname: 'hbs', 
	defaultLayout: 'main'
}));

//assigns the client an ID stored on the server
app.use(require('express-session')({
//secret prevents hijacking and tampering
  secret: 'COP',
  resave: true,
  saveUninitialized: true
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/admin', adminRouter);



// Basic Authentication for session and cookies
function auth (req, res, next) {
  console.log(req.user);

  if (!req.user) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    next(err);
  }
  else {
    next();
  }
}
app.use(auth);

//CORS setup
//app.use(cors());

//bodyparser setup
//transpile request to usable format
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
