var User = require('../../../users/user.model.js');
var Outlet = require('../../../outlets/outlet.model.js');
var Promise = require('bluebird');
var Reservation = require('../../../reservations/reservation.model.js');
var Transaction = require('../../../transactions/transaction.model.js');

module.exports = getTransactionData = function(data) {

  var transactionId = data.clientData.id;

  return new Transaction()
    .query({ where: {id: transactionId} })
    .fetch()
    .then(function(transaction) {
      return transaction
  });

};