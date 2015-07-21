var db = require('../config');
var User = require('../../../users/user.model');
var TimeSlot = require('../../../reservations/timeSlot.model');
var Reservation = require('../../../reservations/reservation.model');
var Transaction = require('../../../transactions/transaction.model');

module.exports = updateReservation = function(req, res){
  var data = req.body;
  var startSlot, endSlot, currentSlot;

  // Recursive function updates reservation slots and creates transaction models for each
  // time slot from beginning to end 
  var newReservation = function(user){
    currentSlot = currentSlot || startSlot;
    // Find reservation
    var reservation = new Reservation({
      outlet_id: data.outletID,
      slot_id: currentSlot,
      date: data.start.date
    }).fetch()
    // Create transaction for reservation
    .then(function(reservation){
      var transaction = new Transaction({
        totalEnergy: 0,
        totalCost: 0,
        paid: false
      });
      transaction.save()
      // Update reservation
      .then(function(newTransaction){
        reservation.set({
          buyer_id: user,
          available: false,
          transaction_id: newTransaction.id 
        }).save();
      })
      // Determine if more reservations need to be updated
      .then(function(){
        if (++currentSlot <= endSlot){
          newReservation(user);
        }
      });
    });
  }

  // Fetch user by request user id
  new User({
    username: req.user.id
  }).fetch()
  // Find corresponding start time slot based on user start input
  .then(function(user){
    new TimeSlot({
      start: data.start.time
    }).fetch()
    // Find corresponding end time slot based on user end input
    .then(function(slot){
      startSlot = slot.id;
      new TimeSlot({
        end: data.end.time
      }).fetch()
      // Start making reservations for user
      .then(function(slot){
        endSlot = slot.id;
        newReservation(user.id);
      });
    });
  });
}