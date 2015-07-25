var db = require('../config');
var Outlet = require('../../../outlets/outlet.model');
var User = require('../../../users/user.model');
var addReservations = require('./addReservationSlots');

module.exports = addNewOutlet = function(req, res){

  var data = req.body;

  return new Outlet()
  .query({ where: {id: data.id} })
  .fetch()
  .then(function(newOutlet) {
    console.log(newOutlet);
    newOutlet.set({
      address: data.address,
      name: data.name,
      description: data.description,
      voltage: data.voltage,
      priceEnergy: data.charge
    }).save()
    .then(function(newOutlet){
      res.send(201, newOutlet);
    })
  });

};
