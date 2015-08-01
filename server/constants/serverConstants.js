
var BASE_URL = process.env.PORT===undefined? 'http://localhost:3000/' : 'https://econnectus.herokuapp.com/';
var POWER_SERVER_BASE_URL = 'http://localhost:3030/'; //set this manually
var authConstants = {
  BASE_URL: BASE_URL,
  FACEBOOK: BASE_URL + 'auth/facebook',
  CALLBACK: BASE_URL + 'auth/facebook/callback',
  LOGOUT: BASE_URL + 'auth/logout',
  REALTIME_ENDPOINT: BASE_URL + 'realtimeData',
  POWER_SERVER_ON:  POWER_SERVER_BASE_URL +'api/on',
  POWER_SERVER_OFF: POWER_SERVER_BASE_URL+'api/off',
  SPECIAL_OUTLET: 'Hack Reactor 963'

};

module.exports = authConstants;

