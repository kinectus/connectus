var request = require('reqwest');
var when = require('when'); //promises
var OutletListConstants = require('../constants/OutletListConstants.js');

var outletServices = function(){

  var outletData = {};

  outletData.retrieve = function(){
    return request({
      url: OutletListConstants.OUTLET_DATA,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      success: function(outlets) {
        return outlets;
      }
    });
  };

  outletData.retrieveOutletByUser = function(){
    console.log('retrieving outlet by user id');
    return request({
      url: OutletListConstants.OUTLETS_BYUSER,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      success: function(outlets){
        console.log(outlets);
        return outlets;
      }
    });
  };

  outletData.retrieveOutletById = function(outletID){
    return request({
      url: OutletListConstants.OUTLET_DATA,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      success: function(outlets) {
        return outlets;
      }
    });
  };

  outletData.addOutlet = function(newOutlet){
    console.log('IN OUTLETSERVICES, ADDOUTLET: ', newOutlet);
    return request({
      url: OutletListConstants.ADD_OUTLET,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      contentType: 'application/json',
      data: JSON.stringify(newOutlet),
      error: function(res, err) {
        console.log('---------------------------------> ERROR');
        console.dir(res, err);
      },
      success: function(res) {
        console.log('---------------------------------> SUCCESS');
        console.dir(res);
      }
    });
  };

  outletData.addTransaction = function(newTransaction){
    console.log('IN OUTLETSERVICES, addTransaction: ', newTransaction);
    return request({
      url: OutletListConstants.ADD_TRANSACTION,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      contentType: 'application/json',
      data: JSON.stringify(newTransaction),
      error: function(res) {
        console.log('---------------------------------> ERROR');
        console.dir(res);
      },
      success: function(res) {
        console.log('---------------------------------> SUCCESS');
        console.dir(res);
      }
    });
  };

  // outletData.turnOff = function(){
  //   return request({
  //     url: '/turnOff',
  //     method: 'POST',
  //     crossOrigin: true,
  //     type: 'json',
  //     success: function(res){
  //       console.log('SUCCESS TURNOFF: ', res)
  //     }
  //   });
  // };

  return outletData;
  
};

module.exports = outletServices();