
var BASE_URL = process.env.PORT===undefined? 'http://localhost:3000/' : 'https://econnectus.herokuapp.com/';

var authConstants = {
  BASE_URL: BASE_URL,
  FACEBOOK: BASE_URL + 'auth/facebook',
  CALLBACK: BASE_URL + 'auth/facebook/callback',
  LOGOUT: BASE_URL + 'auth/logout'
};

module.exports = authConstants;

