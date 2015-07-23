
var BASE_URL = process.ENV.port===undefined? 'http://localhost:3000/' : 'https://econnectus.herokuapp.com/';

var authConstants = {
  BASE_URL: BASE_URL,
  FACEBOOK: BASE_URL + 'auth/facebook',
  LOGOUT: BASE_URL + 'auth/logout'
};

module.exports = authConstants;