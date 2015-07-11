var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
// var ConnectusConstants = require('');
var assign = require('react/lib/Object.assign');    // allows us to extend objects similarly to jquery and underscore lib...
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _outlets = {          // these will obviously actually come from the db when we get one
  outlet1: {
    color: 'black',
    type: 'high',
    location: '944 Market St'
  },
  outlet2: {
    color: 'yellow',
    type: 'low',
    location: '140 Hamerton Ave'
  }
};

var outletStore = assign({}, EventEmitter.prototype, {
  getOutlets: function() {
    return _outlets;
  }
});

ConnectusDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case outletConstant.MORE_INFO:
      break;
    default:
      return true;
  }
});

module.exports = outletStore;