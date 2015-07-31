var User = require('../../../users/user.model.js');
var Outlet = require('../../../outlets/outlet.model.js');
var Promise = require('bluebird');
var Reservation = require('../../../reservations/reservation.model.js');
var Transaction = require('../../../transactions/transaction.model.js');
module.exports = setRealtimeData = function(data) {
  // console.log('data in the query for transactions --------------')
  // console.log(data);
  var transactionId = data.clientData.id;
  // var totalKwh = data.totalKwh || 0;
  var watts = data.avgWatts || 0;
  var kwh = data.kwh || 0;
  var priceKwh = data.clientData.outlet.priceEnergy;
  var priceHourly = data.clientData.outlet.priceHourly;
  var totalCost = kwh * priceKwh;


  // return new Transaction({
  //   id: transactionId
  // }).fetch()
  return new Transaction({id: transactionId})
  .fetch()
  .then(function(transaction) {
    transaction.set({
      totalCost: totalCost + transaction.get('totalCost'),
      totalEnergy: kwh + transaction.get('totalEnergy')
    }).save()
  });
};