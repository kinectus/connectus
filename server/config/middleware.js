var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');  
var path = require('path');
var db = require('./db/config');
require('../auth/auth.controller');
// require('./powerReader.js');

var app = express();
app.use(express.static(path.join( __dirname + '/../../dist')));
var router = express.Router();

app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).

app.use(passport.initialize());
app.use(passport.session());

//be careful about the order of the routers and auth
app.use(router);


require('../auth/auth.routes')(router);

module.exports = app;
