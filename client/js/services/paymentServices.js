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

  paymentInstance.sendPayment = function(cardInfo){
    return request({
      url: PaymentConstants.SEND_PAYMENT,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      contentType: 'application/json',
      data: JSON.stringify(cardInfo),
      success: function(res){
        console.log('response from payment post', res);
      }
    });
  };

  return paymentInstance;
};

module.exports = paymentServices();