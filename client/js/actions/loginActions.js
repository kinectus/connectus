var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher.js');
var loginConstants = require('../constants/authConstants.js');
var RouterContainer = require('../services/RouterContainer.js');

var loginActions = {
  //check to see if user is already logged in - if not, set the token and reroute
  // loginUser: function(jwt){
  //   var savedJwt = localStorage.getItem('token');

  //   if(savedJwt !== jwt){
  //     var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';

  //     RouterContainer.get().transitionTo(nextPath);
  //     localStorage.setItem('jwt', jwt);
  //   }

  //   AppDispatcher.dispatch({
  //     actionType: LOGIN_USER,
  //     jwt: jwt
  //   });
  // },

  // logoutUser: function(){
  //   RouterContainer.get().transitionTo('/login');
  //   localStorage.removeItem('jwt');
  //   AppDispatcher.dispatch({
  //     actionType: LOGOUT_USER
  //   });
  // }
};