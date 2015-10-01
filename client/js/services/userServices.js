var request = require('reqwest');
var when = require('when'); //promises
var UserConstants = require('../constants/userConstants.js');

var userServices = function(){

  var userData = {};

  userData.retrieveUserById = function(id){

    return request({
      url: UserConstants.USER_DATA + '/' + id,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      success: function(user) {
        return user;
      },
      error: function(err) {
        console.log(err);
      }
    });
  };

  return userData;
  
};

module.exports = userServices();
