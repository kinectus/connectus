var Transaction = require('../../../transactions/transaction.model.js');
module.exports = setRealtimeData = function(data) {
  
  var transactionId = data.clientData.id;
  var kwh = data.kwh || 0;
  var priceKwh = data.clientData.outlet.priceEnergy;
  var totalCost = kwh * priceKwh;
  
  return new Transaction({id: transactionId})
  .fetch()
  .then(function(transaction) {
    transaction.set({
      totalCost: totalCost + transaction.get('totalCost'),
      totalEnergy: kwh + transaction.get('totalEnergy')
    }).save();
  });

};