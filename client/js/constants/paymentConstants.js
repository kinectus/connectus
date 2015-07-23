var BASE_URL = process.env.PORT===undefined? 'http://localhost:3000/' : 'https://econnectus.herokuapp.com/';

var paymentConstants = {
  BASE_URL: BASE_URL,
  CLIENT_TOKEN: BASE_URL + 'payment/client_token',
  SEND_PAYMENT: BASE_URL + 'payment/checkout',
  GET_TRANSACTION: BASE_URL + 'payment/transaction_info'
};

module.exports = paymentConstants;