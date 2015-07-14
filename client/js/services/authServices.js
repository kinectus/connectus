var request = require('reqwest');
var when = require('when'); //promises

var authService = function(){
  var authInstance = {};

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
    .then(function(){
      document.cookie='';
    });
  };
  return authInstance;
};

module.exports = authService();
