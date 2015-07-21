var db = require('../config/db/config');
var Outlets = require('../outlets/outlets.collection');
var getOutletsByUser = require('../config/db/queries/getOutletsByUserId');
var addNewOutlet = require('../config/db/queries/addNewOutlet');
var addReservationSlots = require('../config/db/queries/addReservationSlots');
var updateReservation = require('../config/db/queries/updateReservation');
var getAllUsers = require('../config/db/queries/getUserInfo');

module.exports = {

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

  makeReservation: function(req, res) {
    updateReservation(req, res);

    // user passport adds facebook user profile to req so it can be accessed anywhere in express
    console.log('request from user', req.user.id);
  },

  getUserInfo: function(req, res){
    getAllUsers(req, res)
      .then(function(user){
        res.send(200, user);
      });
  }

};


