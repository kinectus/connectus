var request = require('reqwest');
var when = require('when'); //promises

var authService = function(){
  var authInstance = {};

  //sends request to the back end to end the Express session and clear cookies
  authInstance.logout = function(){
    console.log('auth logout called');
    return request({
      url: '/logout',
      method: 'GET',
      crossOrigin: true,
      success: function(){
        document.location ='/';
      }
    })
    //after backend session is cleared, reset the cookie on the front end
    .then(function(){
      document.cookie='';
    });
  };
  return authInstance;
};


module.exports = authService();
