var db = require('../config/db/config');
var Outlet = require('../outlets/outlet.model');
var Outlets = require('../outlets/outlets.collection');
var User = require('../users/user.model');

var AuthController = require('../auth/auth.controller');

var getOutletsByUser = require('../config/db/queries/getOutletsByUserId');
var addNewOutlet = require('../config/db/queries/addNewOutlet');
var getOutletAvailability = require('../config/db/queries/getAvailability');
var addReservationSlots = require('../config/db/queries/addReservationSlots');
var updateReservation = require('../config/db/queries/updateReservation');
var getTimeSlotInfo = require('../config/db/queries/getTimeSlotInfo');
var getAllUsers = require('../config/db/queries/getUserInfo');
var getOutletsByUser = require('../config/db/queries/getOutletsByUserId.js');
var getBuyerReservations = require('../config/db/queries/getBuyerReservations');
var turnOnOutlet = require('../config/db/queries/turnOnOutlet');
var rp = require('request-promise');

// socket.io
var io = require('../config/middleware').io;

var moment = require('moment');

module.exports = {
  
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

    // user passport adds facebook user profile to req so it can be accessed anywhere in express
    // console.log('request from user', req.user.id);
  },

  getUserInfo: function(req, res){
    getAllUsers(req, res)
      .then(function(user){
        res.send(200, user);
      });
  },

  realtimeData: function(req, res){
    console.log('realtimedata from powerserver', req.body);
    // grab the reservation id from req.body
    var reservationId = req.body.reservation.id;
    // socket.on(reservationId, function(){
    //   io.emit(reservationId, req.body)
    //   console.log('emit')
    // });
    io.sockets.emit('energy', req.body);

  },

  turnOnOutlet: function(req, res){
    // query the database for validation - CAN they turn on this outlet??
    // if so...
    res.send(200, 'you turn me on!')
    console.log('reservation info in the api controller: ', req.body);
    var info = req.body;
    var options = {
      method: 'POST',
      body: info,
      json: true,
      uri: 'http://localhost:3030/api/on'
    }
    return rp(options);
  },

  turnOffOutlet: function(req, res){
    var options = {
      method: 'POST',
      uri: 'http://localhost:3030/api/off'
    }
    return rp(options);
  }

};


