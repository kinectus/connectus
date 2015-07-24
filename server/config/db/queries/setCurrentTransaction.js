var User = require('../../../users/user.model.js');
var Outlet = require('../../../outlets/outlet.model.js');
var Promise = require('bluebird');
var Reservation = require('../../../reservations/reservation.model.js');
var Transaction = require('../../../transactions/transaction.model.js');


module.exports = setCurrentTransaction = function(req, next){
  var transactionId = req.body.id;
  var username = req.user.id;
  
  return new Transaction({
    id: transactionId
  }).save({current: true},{patch: true});
  // .then(function(transaction){
  //   return transaction.set('current', true);
  // });

};