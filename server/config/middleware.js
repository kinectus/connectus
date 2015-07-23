var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');  
var path = require('path');
var db = require('./db/config');
var authController = require('../auth/auth.controller');
var cors = require('cors');
var braintree = require('braintree');
// var findCurrentTransaction = require('../config/db/queries/findCurrentTransaction');

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

//BRAINTREE------------>//
// var gateway = braintree.connect({
//   environment: braintree.Environment.Sandbox,
//   merchantId: "fnrgqqwdcfc5wtvh",
//   publicKey: "9wzszhdgj9rq8z8y",
//   privateKey: "6910d378ab21d286f37ed123e70022f6"
// });

// app.get('/client_token', function (req, res) {
//   gateway.clientToken.generate({}, function (err, response) {
//     res.send(response.clientToken);
//   });
// });

// app.post('/checkout', function (req, res) {
//   var nonce = req.body.payment_method_nonce;
//   console.log(req.body);
//   console.log('is user attached?--------->', req.user);
//   // Use payment method nonce here
//   findCurrentTransaction().then(function(trans){
// 	  gateway.transaction.sale({
// 	    amount: trans.totalCost,
// 	    paymentMethodNonce: nonce,
// 	  }, function (err, result) {
//       if(err){
//         console.log(err);
//         return;
//       }
// 	    res.redirect('/#/paymentConfirmation');
// 	  });
//   })
//   .catch(function(error){
//     console.log(error);
//   });
// });

//BRAINTREE------------>//

var authRouter = new express.Router();
var apiRouter = new express.Router();


app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: {httpOnly: false}}));


app.use(passport.initialize());
app.use(passport.session());

//be careful about the order of the routers and auth
app.use('/auth', authRouter);
app.use('/api', apiRouter);


require('../auth/auth.routes')(authRouter);
require('../api/api.routes')(apiRouter);



module.exports = app;
