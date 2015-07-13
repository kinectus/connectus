var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
// var ConnectusConstants = require('');          // omg what is this even
var assign = require('react/lib/Object.assign');    // allows us to extend objects similarly to jquery and underscore lib...
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _outlets = [          // these will obviously actually come from the db when we get one
  { name: 'Jammies Outlet',
    color: 'black',
    type: 'high',
    location: '944 Market St',
    id: '4'
  },
  { name: 'Diannas Outlet',
    color: 'yellow',
    type: 'low',
    location: '140 Hamerton Ave',
    id: '5'
  }
];

var outletStore = assign({}, EventEmitter.prototype, {
  getOutlets: function() {
    return _outlets;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
    console.log('i changed')
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

});

ConnectusDispatcher.register(function(payload){
  var action = payload.action;
  switch(action){
    case 'CLICK_OUTLET':
      _outlets.map(function(outlet){
        if (outlet.id === payload.id){
          outlet.color = 'red';
          console.log('Im red');
          outletStore.emitChange();
          // trigger event!!
        }
      });
      break;
    default:
      return true;
  }
});

module.exports = outletStore;