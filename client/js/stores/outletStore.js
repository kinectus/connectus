var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
// var ConnectusConstants = require('');          // omg what is this even
var assign = require('react/lib/Object.assign');    // allows us to extend objects similarly to jquery and underscore lib...
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _outlets = [          // these will obviously actually come from the db when we get one
  { name: 'Hack Reactor Outlet',
    seller: 'Jammie Mountz',
    voltage: 'high',
    priceHr: '$2/hr',
    pricekWh: '$5/kWh',
    description: '944 Market St on the corner guarded by a purple dragon',
    rating: '4',
    id: '1'
  },
  { name: 'Target Outlet',
    seller: 'Bob Schmob',
    voltage: 'low',
    priceHr: '$2/hr',
    pricekWh: '$4/kWh',
    description: 'just dont look directly at it though',
    rating: '3',
    id: '2'
  },
  { name: 'Macy\'s Outlet',
    seller: 'Stacey Smith',
    voltage: 'high',
    priceHr: '$4/hr',
    pricekWh: '$3/kWh',
    description: 'pay the troll to get access',
    rating: '5',
    id: '3'
  },
  { name: 'Burger Shack Outlet',
    seller: 'Bob Belcher',
    voltage: 'medium',
    priceHr: '$2/hr',
    pricekWh: '$5/kWh',
    rating: '4',
    description: 'watch out for broken dreams',
    id: '4'
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