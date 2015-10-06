var Reservation = require('../../../reservations/reservation.model');
var Slot = require('../../../reservations/timeSlot.model');

var moment = require('moment');

/* 
Currently adds a months worth of unclaimed reservation slots for the outlet.
This is automatically called when a new outlet is created. In the future,
a seller would be able to customize what times she wants her outlet to be
listed as available.
*/

module.exports = addReservationSlots = function(newOutlet){
  var day = moment();

  // Create 48 slots for the day
  var addSlots = function(){
    new Slot().fetchAll()
    .then(function(collection){
      // Create reservation for every slot of the date beginning on current day
      collection.map(function(slot){
        new Reservation({
          outlet_id: newOutlet.id,
          seller_id: newOutlet.seller_id,
          available: true,
          slot_customID: slot.attributes.customID,
          date: day.format('YYYY-MM-DD')
        })
        .save();
      });
    })
    // Increment the day, if less than a month, add slots for next day
    .then(function(){
      day = day.add(1, 'days');
      if (day.diff( moment().add(31, 'days') ) < 0){
        addSlots();
      }
    });
  };

  addSlots();
};
