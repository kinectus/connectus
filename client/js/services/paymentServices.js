var request = require('reqwest');
var when = require('when'); //promises
var PaymentConstants = require('../constants/paymentConstants');

var paymentServices = function(){
  var paymentInstance = {};

  paymentInstance.getToken = function(){
    return request({
      url: PaymentConstants.CLIENT_TOKEN,
      method: 'GET', 
      crossOrigin: true,
      success: function(token){
        return token;
      }
    });
  };

  return paymentInstance;
};

module.exports = paymentServices();