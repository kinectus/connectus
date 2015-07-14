var request = require('reqwest');
var when = require('when'); //promises
var AuthConstants = require('../constants/authConstants.js');
var LoginActions = require('../actions/loginActions.js');
var LOGIN_URL = AuthConstants.LOGIN_URL;
var SIGNUP_URL = AuthConstants.SIGNUP_URL;

var authServices = function(){
  var authInstance = {};
  
  authInstance.login = function(username, password){
    //promisify request to call handleAuth after request has been completed
    return handleAuth(when(request({
      url: LOGIN_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        username, password
      }
    })));
  };

  authInstance.logout = function(){
    //COMPONENT -> ACTION
    LoginActions.logoutUser();
  };

  authInstance.signup = function(username, password){
    //user signs up and gets logged in
    return this.handleAuth(when(request({
      url: SIGNUP_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        username, password
      }
    })));
  };

  authInstance.handleAuth = function(loginPromise){
    return loginPromise
      .then(function(response){
        var jwt = response.id_token;
        LoginActions.loginUser(jwt);
        return true;
      });
  };
  
  return authInstance;
  
};

module.exports = authServices();