var db = require('../config/db/config');
var Outlets = require('../outlets/outlets.collection');
var Outlet = require('../outlets/outlet.model');
var AuthController = require('../auth/auth.controller');
var User = require('../users/user.model');
var getOutletsByUser = require('../config/db/queries/getOutletsByUserId.js');
var Reservation = require('../reservations/reservation.model');
var Reservations = require('../reservations/reservations.collection');
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

  addOutlet: function(req, res) {
    console.log(req.user.id);
    // AuthController.isAuthenticated(req, res, function(user){
    //   console.log('THIS IS WHAT COMES BACK FROM AUTH--------->',user);
    // });
    var data = req.body;

    new User({
      username: req.user.id
    }).fetch().then(function(user){
      new Outlet({
        name: data.name,
        priceEnergy: data.charge,
        // priceHourly: data.priceHourly,
        // lat: data.lat,
        // long: data.long,
        description: data.description,
        // priceSuggest: data.priceSuggest,
        address: data.address,
        voltage: data.voltage
      }).fetch().then(function(found) {
        if (found) {
          res.send(200, found.attributes);
        } else {
          var outlet = new Outlet({
            name: data.name,
            priceEnergy: data.charge,
            seller_id: user.id,
            // priceHourly: data.priceHourly,
            // lat: data.lat,
            // long: data.long,
            description: data.description,
            // priceSuggest: data.priceSuggest,
            address: data.address,
            voltage: data.voltage
          });
    
          outlet.save().then(function(newOutlet){
            console.log('newOutlet before addReservations: ', newOutlet.attributes);
            module.exports.addReservations(newOutlet.attributes);
            return newOutlet;
          })
          .then(function(newOutlet){
            res.send(200, newOutlet);
          })
          .catch(function(error){
            console.log(error);
          });
        }
      });
    })
    .catch(function(error){
      console.log(error);
    });
  },

  getSellerOutlets: function(req, res){
    getOutletsByUser(req.user)
    .then(function(outlets){
      res.send(200, outlets.models);
    });
  },

  addReservations: function(newOutlet){
    //2013-02-09 00:00:00.000
    // var day = moment().format('YYYY-MM-DD HH:mm:ss:SSS');
    var day = moment();
    var slot = 1;

    var addSlot = function(){
      var reservation = new Reservation({
        outlet_id: newOutlet.id,
        seller_id: newOutlet.seller_id,
        available: true,
        slot_id: slot,
        date: day.format('YYYY-MM-DD')
      });

      reservation.save().then(function(newReservation){
        Reservations.add(newReservation);
        slot = slot < 48 ? ++slot : 1;
        if (slot === 1){
          day = day.add(1, 'days');
        }
        // return newReservation;
      }).then(function(){
        if (day.diff( moment().add(31, 'days') ) < 0){
          addSlot();
        }
      }).catch(function(err){
        console.log('addSlot err: ', err);
      });
    }

    addSlot();
  },

  addTransaction: function(req, res) {

    // user passport adds facebook user profile to req so it can be accessed anywhere in express
    console.log('request from user', req.user.id);
  }

};


