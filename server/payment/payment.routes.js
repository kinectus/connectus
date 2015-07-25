var authController = require('../auth/auth.controller');
var paymentController = require('../payment/payment.controller');

module.exports = function(app){

	app.post('/checkout', authController.isAuthenticated, paymentController.checkout);
	app.get('/client_token', authController.isAuthenticated, paymentController.client_token);
	app.get('/transaction_info', authController.isAuthenticated, paymentController.getTransactionInfo);

};
