var db = require('../config');
var User = require('../../../users/user.model');
var TimeSlot = require('../../../reservations/timeSlot.model');
var Reservation = require('../../../reservations/reservation.model');
var Transaction = require('../../../transactions/transaction.model');

module.exports = updateReservation = function(req, res){
  // user passport adds facebook user profile to req so it can be accessed anywhere in express
  console.log('request from user', req.user.id);
  var data = req.body;
  var startSlot, endSlot;
  var currentSlot;
  console.log('AWESOME NEW FIXED UP DATAAAAAA:', data)

  var newReservation = function(user){
    currentSlot = currentSlot || startSlot;
    var reservation = new Reservation({
      outlet_id: data.outletID,
      slot_id: currentSlot,
      date: data.start.date
    }).fetch()
    .then(function(reservation){
      var transaction = new Transaction({
        totalEnergy: 0,
        totalCost: 0,
        paid: false
      });

      console.log('transaction: ', transaction);

      transaction.save().then(function(newTransaction){
        console.log('reservation attributes: ', reservation.attributes);
        reservation.set({
          buyer_id: user,
          available: false,
          transaction_id: newTransaction.id 
        }).save();
      }).then(function(){
        if (++currentSlot <= endSlot){
          newReservation(user);
        }
      });
    });
  }
  new User({
    username: req.user.id
  }).fetch().then(function(user){
    console.log('start: ', data.start.date, data.start.time.slice(0, data.start.time.length-1) + '0')
    new TimeSlot({
      start: data.start.time.slice(0, data.start.time.length-1) + '0'
    }).fetch().then(function(slot){
      startSlot = slot.id;
      new TimeSlot({
        end: data.end.time.slice(0, data.start.time.length-1) + '0'
      }).fetch().then(function(slot){
        endSlot = slot.id;
        console.log('start slot.id: ', startSlot, ' end slot.id: ', endSlot);
        newReservation(user.id);
      });
    });
  });
}