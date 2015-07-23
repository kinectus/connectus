var BASE_URL = 'http://localhost:3000/';

var paymentConstants = {
  BASE_URL: BASE_URL,
  CLIENT_TOKEN: BASE_URL + 'api/client_token',
  SEND_PAYMENT: BASE_URL + 'api/checkout'
};

module.exports = paymentConstants;