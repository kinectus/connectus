var Outlets = require('../outlets/outlets.collection');
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
var setCurrentTransaction = require('../config/db/queries/setCurrentTransaction');
var setInitialTransactionCost = require('../config/db/queries/setInitialTransactionCost.js');
var M = require('moment');
var io = require('../server.js');
var rp = require('request-promise');
var addressValidator = require('address-validator');
var Address = addressValidator.Address;

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
        console.log(err, exact, inexact);
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
      res.send(200, slots.models);
    });
  },

  addReservations: function(newOutlet){
    addReservationSlots(newOutlet);
  },

  buyerReservations: function(req, res){
    getBuyerReservations(req.user, res);
  },

  makeReservation: function(req, res) {
    updateReservation(req, res)
    .then(function(reservation) {
      res.status(200).send(reservation);
    });
  },

  getUserInfo: function(req, res){
    getUserInfo(req, res)
      .then(function(user){
        res.status(200).send(user);
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
    var startDate = M(info.endTime.date);
    var endDate = M(info.startTime.date);
    var reservationHours = startDate.diff(endDate,'hours') + (-info.startTime.slot.number + info.endTime.slot.number+1)/2;
    var initialCost = reservationHours * hourlyPrice;
    setInitialTransactionCost(transactionId, initialCost);


    res.status(200).send(JSON.stringify('Outlet turned on'));
    
    if( outletName !== ServerConstants.SPECIAL_OUTLET ) {
      // simulate an appliance's power use
      var totalKwh = 0;
      var getWatts = function() {
        var watts = Math.random()*1000;
        var kwh = watts/1000/(60*60) * 10;
        totalKwh += kwh;
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
    } else {
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
    res.status(200).send(JSON.stringify('Outlet turned off'));
    var transactionId = req.body.id;
    var outletName = req.body.outlet.name;
    if( outletName !== ServerConstants.SPECIAL_OUTLET ) {
      // simulate an appliance's power use
      var intervalId = intervalIds[transactionId];
      clearInterval(intervalId);
    } else {
      var options = {
        method: 'POST',
        uri: ServerConstants.POWER_SERVER_OFF
      };
      return rp(options);
    }
  }

};


