
var BASE_URL = process.env.PORT===undefined? 'http://localhost:3000/' : 'https://econnectus.herokuapp.com/';

var authConstants = {
  BASE_URL: BASE_URL,
  FACEBOOK: BASE_URL + 'auth/facebook',
  CALLBACK: BASE_URL + 'auth/facebook/callback',
  LOGOUT: BASE_URL + 'auth/logout',
  POWER_SERVER_ON: 'http://localhost:3030/api/on',
  POWER_SERVER_OFF: 'http://localhost:3030/api/off'
};

module.exports = authConstants;

