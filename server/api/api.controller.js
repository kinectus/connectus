var db = require('../config/db/config');
var Outlet = require('../outlets/outlet.model');
var Outlets = require('../outlets/outlets.collection');
var User = require('../users/user.model');

var AuthController = require('../auth/auth.controller');
var ServerConstants = require('../constants/serverConstants');
var getOutletsByUser = require('../config/db/queries/getOutletsByUserId');
var addNewOutlet = require('../config/db/queries/addNewOutlet');
var updateOutlet = require('../config/db/queries/updateOutlet');
var getOutletAvailability = require('../config/db/queries/getAvailability');
var addReservationSlots = require('../config/db/queries/addReservationSlots');
var updateReservation = require('../config/db/queries/updateReservation');
var getTimeSlotInfo = require('../config/db/queries/getTimeSlotInfo');
var getUserInfo = require('../config/db/queries/getUserInfo');
var getOutletsByUser = require('../config/db/queries/getOutletsByUserId.js');
var getBuyerReservations = require('../config/db/queries/getBuyerReservations');
var turnOnOutlet = require('../config/db/queries/turnOnOutlet');
var setInitialTransactionCost = require('../config/db/queries/setInitialTransactionCost.js');
var M = require('moment');
var rp = require('request-promise');

var addressValidator = require('address-validator');
var Address = addressValidator.Address;
var _ = require('underscore');
var geocoder = require('geocoder');

// socket.io
var io = require('../server.js');


var moment = require('moment');
var intervalIds = {};
module.exports = {
  
  validateAddress: function(req, res){
    var address = new Address({
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.zip,
        country: 'US'
    });

    addressValidator.validate(address, addressValidator.match.streetAddress, function(err, exact, inexact){
        res.send(200, {exact:exact, err: err, inexact:inexact});
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

  setTransaction: function(req, res){
    var username = req.user.id;
    setCurrentTransaction(req).then(function(result){
      res.send(200, result);
    });
    
  },

  addOutlet: function(req, res) {
    addNewOutlet(req, res);
  },

  editOutlet: function(req, res){
    updateOutlet(req, res);
  },

  getSellerOutlets: function(req, res){
    console.log('got to getSellerOutlets')
    getOutletsByUser(req.user)
    .then(function(outlets){
      res.send(200, outlets.models);
    });
  },

  getAvailability: function(req, res){
    getOutletAvailability(req, res);
  },

  seeTimeSlots: function(req, res){
    getTimeSlotInfo(req, res)
    .then(function(slots){
      res.send(200, slots.models)
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
    // res.send('reservation completed');
    // user passport adds facebook user profile to req so it can be accessed anywhere in express
    // console.log('request from user', req.user.id);
  },

  getUserInfo: function(req, res){
    getUserInfo(req, res)
      .then(function(user){
        console.log('GET USER INFO, USER: ', user);
        res.send(200, user);
      });
  },

  // data hitting server from the power server (UP)
  // realtimeData: function(req, res){
  //   var reservationId = req.body.reservation.id;
  //   io.on('connection', function(socket) {
  //     console.log('whats up')
  //       socket.emit('energy', 'hi')
  //   });
  // },

  // request hitting server from the client (DOWN)
  turnOnOutlet: function(req, res){
    var outletName = req.body.outlet.name;
    var info = req.body;
    var transactionId = info.id;
    var hourlyPrice = info.outlet.priceHourly;
    // query the database for validation - CAN they turn on this outlet??
    // if so...
    // console.log(data.clientData.startTime.slot, data.clientData.endTime.slot);
    console.log('starttime',info.startTime.slot.number);
    console.log('endtime',info.endTime.slot.number);
    var startDate = M(info.endTime.date);
    var endDate = M(info.startTime.date);
    var reservationHours = startDate.diff(endDate,'hours') + (-info.startTime.slot.number + info.endTime.slot.number+1)/2;
    var initialCost = reservationHours * hourlyPrice;
    console.log('reshours',reservationHours, info);
    setInitialTransactionCost(transactionId, initialCost);
    // do cost math
    // set cost in db 
    // console.log('inturnonoutlet', req.body);


    res.status(200).send('you turn me on!');
    
    // console.log(req.body);
    
    if( outletName !== ServerConstants.SPECIAL_OUTLET ) {
      // simulate an appliance's power use
      var totalKwh = 0;
      var getWatts = function() {
        var watts = Math.random()*1000;
        var kwh = watts/1000/(60*60) * 10;
        totalKwh += kwh;
        // console.log('in turnme on stub -------------------------------------', req.body);
        var data = {
          avgWatts: watts,
          kwh: kwh,
          totalKwh: totalKwh,
          clientData: info
        };
        var options = {
          method: 'POST',
          body: data,
          json: true,
          uri: ServerConstants.REALTIME_ENDPOINT
        };
        return rp(options);
      };
      var intervalId = setInterval(getWatts, 2000);
      intervalIds[transactionId] = intervalId;
      console.log('turnon intervalid: ', intervalId, 'intervals: ', intervalIds);
    } else {
      console.log(ServerConstants.SPECIAL_OUTLET)
      var options = {
        method: 'POST',
        body: info,
        json: true,
        uri: ServerConstants.POWER_SERVER_ON
      }
      return rp(options);
    }
  },

  turnOffOutlet: function(req, res){
    console.log('-----------------------------------------------------in turn off', req.body);
    res.status(200).send('you turn me off :( !');
    var transactionId = req.body.id;
    var outletName = req.body.outlet.name;
    if( outletName !== ServerConstants.SPECIAL_OUTLET ) {
      // simulate an appliance's power use
      var intervalId = intervalIds[transactionId];
      // console.log('turn off intervalid: '. intervalId, 'intervals: ', intervalIds);
      clearInterval(intervalId);
    } else {
      console.log(ServerConstants.SPECIAL_OUTLET)
      var options = {
        method: 'POST',
        uri: ServerConstants.POWER_SERVER_OFF
      }
      return rp(options);
    }
  }

};


