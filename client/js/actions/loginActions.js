//TEMP CODE - FILE IN PROGRESS

var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher.js');
var loginConstants = require('../constants/authConstants.js');
var RouterContainer = require('../services/RouterContainer.js');

var loginActions = {
  loginUser: function(jwt){
    var savedJwt = localStorage.getItem('jwt');
    //if correct password    
    if(savedJwt !== jwt){
      //TODO: redirect when appropriate
      // var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';

      RouterContainer.get().transitionTo('/landingPage');//TODO: change parameter to be dyname
      localStorage.setItem('jwt', jwt);
      console.log('item set in localStorage', localStorage.getItem('jwt'));
    }
    //ACTION -> DISPATCH
    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      jwt: jwt
    });
  },

  logoutUser: function(){
    RouterContainer.get().transitionTo('/login');
    localStorage.removeItem('jwt');
    AppDispatcher.dispatch({
      actionType: LOGOUT_USER
    });
  }
};

module.exports = loginActions;