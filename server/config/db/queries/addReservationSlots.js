var db = require('../config');

var Reservation = require('../../../reservations/reservation.model');
var Reservations = require('../../../reservations/reservations.collection');
var Slot = require('../../../reservations/timeSlot.model');

var moment = require('moment');

//2013-02-09 00:00:00.000
// var day = moment().format('YYYY-MM-DD HH:mm:ss:SSS');

module.exports = addReservationSlots = function(newOutlet){
  var day = moment();

  // Create 48 slots for the day
  var addSlots = function(){
    new Slot().fetchAll()
    .then(function(collection){
      collection.map(function(slot){

        new Reservation({
          outlet_id: newOutlet.id,
          seller_id: newOutlet.seller_id,
          available: true,
          slot_customID: slot.attributes.customID,
          date: day.format('YYYY-MM-DD')
        })
        .save()
      })
    })
    .then(function(){
      day = day.add(1, 'days');
      if (day.diff( moment().add(31, 'days') ) < 0){
        addSlots();
      }
    });
  };

  addSlots();
};
