var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');  
var path = require('path');
var db = require('./db/config');
var authController = require('../auth/auth.controller');
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

var authRouter = new express.Router();
var apiRouter = new express.Router();
var paymentRouter = new express.Router();


app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: {httpOnly: false}}));


app.use(passport.initialize());
app.use(passport.session());

//be careful about the order of the routers and auth
app.use('/auth', authRouter);
app.use('/api', apiRouter);
app.use('/payment', paymentRouter);


require('../auth/auth.routes')(authRouter);
require('../api/api.routes')(apiRouter);
require('../payment/payment.routes')(paymentRouter);



module.exports = app;
