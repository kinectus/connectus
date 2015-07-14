var request = require('reqwest');
var when = require('when'); //promises
var OutletListConstants = require('../constants/OutletListConstants.js');

var outletServices = function(){
  var outletData = {};

  outletData.retrieve = function(outletID){

    return handleAuth(when(request({
      url: OUTLET_DATA,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      data: {
        // not sure what this will look like yet
      }
    })));
  };

  return outletData;
  
};

module.exports = outletServices();