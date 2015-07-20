var db = require('../config');
var Reservation = require('../../../reservations/reservation.model');
var Reservations = require('../../../reservations/reservations.collection');
var moment = require('moment');

//2013-02-09 00:00:00.000
// var day = moment().format('YYYY-MM-DD HH:mm:ss:SSS');

module.exports = addReservationSlots = function(newOutlet){
  var day = moment();
  var slot = 1;

  var addSlot = function(){
    var reservation = new Reservation({
      outlet_id: newOutlet.id,
      seller_id: newOutlet.seller_id,
      available: true,
      slot_id: slot,
      date: day.format('YYYY-MM-DD')
    });

    reservation.save().then(function(newReservation){
      Reservations.add(newReservation);
      slot = slot < 48 ? ++slot : 1;
      if (slot === 1){
        day = day.add(1, 'days');
      }
      // return newReservation;
    }).then(function(){
      if (day.diff( moment().add(31, 'days') ) < 0){
        addSlot();
      }
    }).catch(function(err){
      console.log('addSlot err: ', err);
    });
  }

  addSlot();
}