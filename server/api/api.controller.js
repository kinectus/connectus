var db = require('../config/db/config');
var Outlets = require('../outlets/outlets.collection');
var getOutletsByUser = require('../config/db/queries/getOutletsByUserId');
var addNewOutlet = require('../config/db/queries/addNewOutlet');
var addReservationSlots = require('../config/db/queries/addReservationSlots');
var updateReservation = require('../config/db/queries/updateReservation');
var getAllUsers = require('../config/db/queries/getUserInfo');
var Outlet = require('../outlets/outlet.model');
var AuthController = require('../auth/auth.controller');
var User = require('../users/user.model');
var getOutletsByUser = require('../config/db/queries/getOutletsByUserId.js');
var moment = require('moment');
var getBuyerReservations = require('../config/db/queries/getBuyerReservations');
var braintree = require('braintree');
var findCurrentTransaction = require('../config/db/queries/findCurrentTransaction');
var turnOnOutlet = require('../config/db/queries/turnOnOutlet');
var rp = require('request-promise');

var gateway = braintree.connect({
environment: braintree.Environment.Sandbox,
merchantId: "fnrgqqwdcfc5wtvh",
publicKey: "9wzszhdgj9rq8z8y",
privateKey: "6910d378ab21d286f37ed123e70022f6"
});

module.exports = {
  
  client_token: function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
  },

  checkout: function (req, res) {
  var nonce = req.body.payment_method_nonce;
  console.log('is user attached?--------->', req.user);
  // Use payment method nonce here
  findCurrentTransaction(req.user.id).then(function(trans){
    console.log('totalCost---------->', trans.totalCost);
    gateway.transaction.sale({
      amount: 10,
      paymentMethodNonce: nonce,
    }, function (err, result) {
      if(err){
        console.log(err);
        return;
      }
      res.redirect('/#/paymentConfirmation');
    });
  })
  .catch(function(error){
    console.log(error);
  });
  },

  getAllOutlets: function(req, res) {
    Outlets.reset().fetch().then(function(outlets) {
      res.send(outlets);
    })
    .catch(function(error) {
      console.log('error:', error);
    });
  },

  addOutlet: function(req, res) {
    addNewOutlet(req, res);
  },

  getSellerOutlets: function(req, res){
    getOutletsByUser(req.user)
    .then(function(outlets){
      res.send(200, outlets.models);
    });
  },

  addReservations: function(newOutlet){
    addReservationSlots(newOutlet);
  },

  buyerReservations: function(req, res){
    getBuyerReservations(req.user, res);
  },

  makeReservation: function(req, res) {
    updateReservation(req, res);

    // user passport adds facebook user profile to req so it can be accessed anywhere in express
    // console.log('request from user', req.user.id);
  },

  getUserInfo: function(req, res){
    getAllUsers(req, res)
      .then(function(user){
        res.send(200, user);
      });
  },

  turnOnOutlet: function(req, res){
    console.log('turnOnOutlet function in the api controller: ', req.body.id)
    // query the database for validation - CAN they turn on this outlet??
    // if so...
    var outletId = req.body.id;
    var options = {
      method: 'POST',
      uri: 'http://localhost:3030/api/on'
    }
    return rp(options);
  }

};


