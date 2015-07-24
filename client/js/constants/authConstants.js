var BASE_URL = window.location.origin+'/';

var authConstants = {
  BASE_URL: BASE_URL,
  FACEBOOK: BASE_URL + 'auth/facebook',
  CALLBACK: BASE_URL + 'auth/facebook/callback',
  LOGOUT: BASE_URL + 'auth/logout'
};

module.exports = authConstants;