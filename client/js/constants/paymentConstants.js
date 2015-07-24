var BASE_URL = window.location.origin+'/';

var paymentConstants = {
  BASE_URL: BASE_URL,
  CLIENT_TOKEN: BASE_URL + 'payment/client_token',
  SEND_PAYMENT: BASE_URL + 'payment/checkout',
  GET_TRANSACTION: BASE_URL + 'payment/transaction_info'
};

module.exports = paymentConstants;