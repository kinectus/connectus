var User = require('../../../users/user.model.js');
var Outlet = require('../../../outlets/outlet.model.js');
var Promise = require('bluebird');
var Reservation = require('../../../reservations/reservation.model.js');
var Transaction = require('../../../transactions/transaction.model.js');

module.exports = setRealtimeData = function(req){
  var transactionId = req.body.id;
  var totalKwh = req.body.total;
  var watts = req.body.watts;
  var priceKwh = req.body.outlet.priceEnergy;
  var priceHourly = req.body.outlet.priceHourly;
  var totalCost = totalKwh * priceKwh + priceHourly/(60*60)*10;

    
  return new Transaction({
    id: transactionId
  }).fetch()
  .then(function(transaction) {
    transaction.totalCost 
  })

  save({totalCost: totalCost, totalEnergy: totalkWh },{patch: true});
  // .then(function(transaction){
  //   return transaction.set('current', true);
  // });

};