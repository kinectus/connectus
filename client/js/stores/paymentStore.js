var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
// var ConnectusConstants = require('');          // omg what is this even
var assign = require('react/lib/Object.assign');    // allows us to extend objects similarly to jquery and underscore lib...
var EventEmitter = require('events').EventEmitter;
var PaymentServices = require('../services/paymentServices');
var CHANGE_EVENT = 'change';

var paymentStore = assign({}, EventEmitter.prototype, {
  getClientToken: function(){
    return PaymentServices.getToken().then(function(token){
      return token;
    });
  }
});

module.exports = paymentStore;