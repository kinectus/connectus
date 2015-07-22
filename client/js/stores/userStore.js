var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var assign = require('react/lib/Object.assign');    // allows us to extend objects similarly to jquery and underscore lib...
var EventEmitter = require('events').EventEmitter;
var UserServices = require('../services/userServices');

var CHANGE_EVENT = 'change';

var userStore = assign({}, EventEmitter.prototype, {
  
  getUsernameById: function(id) {
    return UserServices.retrieveUserById(id).then(function(user){
      return user;
    });
  }

});

module.exports = userStore;