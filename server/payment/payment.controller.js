var braintree = require('braintree');
var findCurrentTransaction = require('../config/db/queries/findCurrentTransaction');
var setCurrentTransaction = require('../config/db/queries/setCurrentTransaction');
var findCurrentTransaction = require('../config/db/queries/findCurrentTransaction');
var config = require('../config/configKeys.js');


var gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: config.braintreeMerchantId,
	publicKey: config.braintreePublicKey,
	privateKey: config.braintreePrivateKey
});

module.exports = {
	client_token: function (req, res) {
		gateway.clientToken.generate({}, function (err, response) {
		  res.send(response.clientToken);
		});
	},
	
  getTransactionInfo: function(req, res){
  	findCurrentTransaction(req.user.id).then(function(reservation){
      res.send(reservation.relations.transaction_current);
    });
  },
  
	checkout: function (req, res) {
		var nonce = req.body.payment_method_nonce;
		findCurrentTransaction(req.user.id).then(function(reservation){
		  gateway.transaction.sale({
		    amount: reservation.relations.transaction_current.attributes.totalCost,
		    paymentMethodNonce: nonce,
		  }, function (err, result) {
		    if(err){
		      console.log(err);
		      return;
		    }
		    res.redirect('/#/paymentConfirmation');
	    });
		})
		.catch(function(error){
		  console.log(error);
		});
	}
  
};

