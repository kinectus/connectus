var db = require('../config/db/config');
var Outlets = require('../outlets/outlets.collection');
var Outlet = require('../outlets/outlet.model');
var AuthController = require('../auth/auth.controller');
var User = require('../users/user.model');
var getOutletsByUser = require('../config/db/queries/getOutletsByUserId.js');

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
    // console.log('>>>>>>>>>>>>>>>>>>>>>>in addoutlet');
    // res.send(200);
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
            Outlets.add(newOutlet);
            res.send(200, newOutlet);
            return newOutlet;
          })
          .then(function(newOutlet){
            this.addReservations(newOutlet);
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
    console.log('THIS IS THE NEW OUTLET ->>>>>>>>>>>>>', newOutlet);
  },

  addTransaction: function(req, res) {

    // user passport adds facebook user profile to req so it can be accessed anywhere in express
    console.log('request from user', req.user.id);
  }

};


