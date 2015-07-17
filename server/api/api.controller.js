var db = require('../config/db/config');
var Outlets = require('../outlets/outlets.collection');
var Outlet = require('../outlets/outlet.model')

module.exports = {

  getAllOutlets: function(req, res) {
    Outlets.reset().fetch().then(function(outlets) {
      res.send(outlets)
    })
    .catch(function(error) {
      console.log('error:', error);
    });
  },

  addOutlet: function(req, res) {
    var data = req.body;
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
        });
      }
    });
  },
  addTransaction: function(req, res) {
    console.log(req);
  }

};
