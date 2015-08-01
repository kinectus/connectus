var Transaction = require('../../../transactions/transaction.model.js');


module.exports = setCurrentTransaction = function(req){
  var transactionId = req.body.id;
  var currentStatus = req.body.currentStatus;
  var paid = req.body.paid;
  
  return new Transaction({
    id: transactionId
  }).save({current: currentStatus, paid: paid},{patch: true});
};