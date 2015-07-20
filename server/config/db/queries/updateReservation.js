var db = require('../config');
var User = require('../../../users/user.model');
var TimeSlot = require('../../../reservations/timeSlot.model');
var Reservation = require('../../../reservations/reservation.model');
var Transaction = require('../../../transactions/transaction.model');

module.exports = updateReservation = function(req, res){
  // user passport adds facebook user profile to req so it can be accessed anywhere in express
  console.log('request from user', req.user.id);
  var data = req.body;

  new User({
    username: req.user.id
  }).fetch().then(function(user){
    console.log('start: ', data.start.date, data.start.time.slice(0, data.start.time.length-1) + '0')
    new TimeSlot({
      start: data.start.time.slice(0, data.start.time.length-1) + '0'
    }).fetch().then(function(slot){
      console.log('slot.id: ', slot.id);
      var reservation = new Reservation({
        outlet_id: data.outletID,
        slot_id: slot.id
      }).fetch().then(function(reservation){
        var transaction = new Transaction({
          totalEnergy: 0,
          totalCost: 0,
          paid: false
        });
        console.log('transaction: ', transaction);
        transaction.save().then(function(newTransaction){
          console.log('reservation attributes: ', reservation.attributes);
          reservation.set({
            buyer_id: user.id,
            available: false,
            transaction_id: newTransaction.id 
          }).save();
        });
      });
    });
  });
}