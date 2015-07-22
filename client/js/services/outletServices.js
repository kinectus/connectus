var request = require('reqwest');
var when = require('when'); //promises
var OutletListConstants = require('../constants/OutletListConstants.js');

var outletServices = function(){

  var outletData = {};

  outletData.getLocation = function(lat, long){
    navigator.geolocation.getCurrentPosition(function(position) {
     lat = position.coords.latitude;
     long = position.coords.longitude;
    });
  };

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

  outletData.calculateOutletRating = function(outlets) {
    console.log('calculating outlet rating in the store')
    outlets.map(function(outlet){
      if (outlet.thumbs_up + outlet.thumbs_down < 10) {
        outlet.rating = 'no rating availabile';
      } else {
        outlet.rating = Math.floor((100/(outlet.thumbs_up + outlet.thumbs_down)) * outlet.thumbs_up) + "% buyer approval"
      }
    })
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
      success: function(res) {
        console.log('---------------------------------> SUCCESS');
        console.dir(res);
      }
    });
  };

  outletData.makeReservation = function(newReservation){
    console.log('IN OUTLETSERVICES, makeReservation: ', newReservation);
    return request({
      url: OutletListConstants.MAKE_RESERVATION,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      contentType: 'application/json',
      data: JSON.stringify(newReservation),
      success: function(res) {
        console.log('---------------------------------> SUCCESS');
        console.dir(res);
      }
    });
  };

  outletData.seeBuyerReservations = function(){
    return request({
      url: OutletListConstants.SEEBUYER_RESERVATIONS,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      contentType: 'application/json',
      error: function(res) {
        console.log('error----------------------->', res);
      },
      success: function(reservations) {
        return reservations;
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