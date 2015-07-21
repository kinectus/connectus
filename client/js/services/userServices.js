var request = require('reqwest');
var when = require('when'); //promises
var UserConstants = require('../constants/userConstants.js');

var userServices = function(){

  var userData = {};

  userData.retrieveUserById = function(id){

    console.log('in the userservices with id: ', id)

    return request({
      url: UserConstants.USER_DATA + '/' + id,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      success: function(user) {
        return user;
      },
      error: function() {
        console.log('error in user services')
      }
    });
  };

  return userData;
  
};

module.exports = userServices();