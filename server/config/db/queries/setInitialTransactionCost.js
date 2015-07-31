var User = require('../../../users/user.model.js');
var Outlet = require('../../../outlets/outlet.model.js');
var Promise = require('bluebird');
var Reservation = require('../../../reservations/reservation.model.js');
var Transaction = require('../../../transactions/transaction.model.js');
module.exports = setInitialTransactionCost = function(transactionId, initialCost) {



  // return new Transaction({
  //   id: transactionId
  // }).fetch()
  return new Transaction({id: transactionId})
  .fetch()
  .then(function(transaction) {
    transaction.set({
      totalCost: initialCost
    }).save()
  });
};
 