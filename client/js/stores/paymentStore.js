var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
// var ConnectusConstants = require('');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var PaymentServices = require('../services/paymentServices');
var CHANGE_EVENT = 'change';

var paymentStore = assign({}, EventEmitter.prototype, {
  getClientToken: function(){
    return PaymentServices.getToken().then(function(token){
      return token;
    });
  },
  getTransactionInfo: function(){
    function pad (num, size){
      num = num + "";
      while(num.length < size){
        num="0" + num;
      }
      return num;
    }

    return PaymentServices.getTransactionInfo().then(function(transaction){
      transaction.confirmation = pad(transaction.id, 5);
      return transaction;
    });
  }
});

module.exports = paymentStore;
