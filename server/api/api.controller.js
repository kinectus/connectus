var db = require('../config/db/config');
var Outlets = require('../outlets/outlets.collection');
var getOutletsByUser = require('../config/db/queries/getOutletsByUserId');
var addNewOutlet = require('../config/db/queries/addNewOutlet');
var addReservationSlots = require('../config/db/queries/addReservationSlots');
var updateReservation = require('../config/db/queries/updateReservation');

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
  }

};


