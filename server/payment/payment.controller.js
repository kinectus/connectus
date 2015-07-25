var braintree = require('braintree');var findCurrentTransaction = require('../config/db/queries/findCurrentTransaction');
var setCurrentTransaction = require('../config/db/queries/setCurrentTransaction');
var findCurrentTransaction = require('../config/db/queries/findCurrentTransaction');

var gateway = braintree.connect({
environment: braintree.Environment.Sandbox,
merchantId: "fnrgqqwdcfc5wtvh",
publicKey: "9wzszhdgj9rq8z8y",
privateKey: "6910d378ab21d286f37ed123e70022f6"
});

module.exports = {
	client_token: function (req, res) {
    console.log('set this as user id',req.user.id);
	gateway.clientToken.generate({}, function (err, response) {
	  res.send(response.clientToken);
	});
	},
	
	
  getTransactionInfo: function(req, res){
    console.log('getting transaction info in payment controller')
  	findCurrentTransaction(req.user.id).then(function(reservations){
      res.send(reservations.models[0].relations.transaction_current);
    });
  },
  

	checkout: function (req, res) {
	var nonce = req.body.payment_method_nonce;
	findCurrentTransaction(req.user.id).then(function(reservations){
	  gateway.transaction.sale({
	    amount: reservations.models[0].relations.transaction_current.attributes.totalCost,
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

