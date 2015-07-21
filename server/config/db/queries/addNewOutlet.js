var db = require('../config');
var Outlet = require('../../../outlets/outlet.model');
var User = require('../../../users/user.model');
var addReservations = require('./addReservationSlots');

module.exports = addNewOutlet = function(req, res){
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
        res.send(201, found.attributes);
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
          addReservations(newOutlet.attributes);
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
}