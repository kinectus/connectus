var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');  
var path = require('path');
var db = require('./db/config');
var authController = require('../auth/auth.controller');
// require('./powerReader.js');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use(function(err, req, res, next){
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

app.use(express.static(path.join( __dirname + '/../../dist')));
var router = new express.Router();
var apiRouter = new express.Router();
// var outletsRouter = express.Router();

app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: {httpOnly: false}}));


app.use(passport.initialize());
app.use(passport.session());

//be careful about the order of the routers and auth
app.use(router);
app.use('/api', apiRouter);
// app.use('/outlets', outletsRouter);

require('../auth/auth.routes')(router);
require('../api/api.routes')(apiRouter);
// require('../outlets/outlets.routes')(outletsRouter);
// app.use('/api', apiRouter);
// app.use('/outlets', outletsRouter);


// require('../auth/auth.routes')(apiRouter);
// require('../outlets/outlets.routes')(outletsRouter);

module.exports = app;
