var db = require('../config');
var User = require('../../../users/user.model');
var TimeSlot = require('../../../reservations/timeSlot.model');
var Reservation = require('../../../reservations/reservation.model');
var Transaction = require('../../../transactions/transaction.model');
var moment = require('moment');
var transactionID;

module.exports = updateReservation = function(req, res){
  var data = req.body;
  // Slot tracking
  var startSlot, endSlot, currentSlot;
  // Date tracking
  var startDate = data.start.date;
  var endDate = data.end.date;
  var currentDate;
  var sameDay = (startDate === endDate);
  // Transaction tracking

  // Recursive function updates reservation slots and creates transaction models for each
  // time slot from beginning to end 
  var newReservation = function(user, passedSlot){
    currentSlot = passedSlot;
    currentDate = currentDate || startDate;

      // Find reservation
      new Reservation()
      .query({where: {outlet_id: data.outletID, slot_id: currentSlot, date: currentDate} })
      .fetch()

      // Update reservation
      .then(function(newReservation){
        if (!newReservation) {
          console.log('sending res 404 no slot');
          res.send(404, 'No slot found');
          return;
        } else if (newReservation.available == false) {
          console.log('sending res 404 not available');
          res.send(404, 'Reservation is not available');
          return;
        } else {
          newReservation.set({
            buyer_id: user,
            available: false,
            transaction_id: transactionID
          }).save();
        }
      })
      // Determine if more reservations need to be updated
      .then(function(){

        // Completion check for same day reservations
        if (sameDay){
          if (++currentSlot <= endSlot){
            return newReservation(user, currentSlot);
          } else {
            console.log('sending res 201 sameday posted');
            res.send(201, 'POST reservations complete');
            return;
          }
        // Completion check for multi-day reservations
        } else {
          currentSlot = currentSlot < 48 ? ++currentSlot : 1;
          currentDate = currentSlot === 1 ? moment(currentDate).add(1, 'days').format('YYYY-MM-DD').toString() : currentDate;
          var difference = moment(currentDate).diff(moment(endDate));
          console.log('startDate: ', startDate, ', endDate: ', endDate, ', currentDate: ', currentDate, ', difference: ', difference);
          if ( difference <= 0 ){
            if ( currentSlot <= endSlot  || difference < 0){
              return newReservation(user, currentSlot);
            } else {
              console.log('sending res 201 multi-day posted');
              res.send(201, 'POST reservations complete');
              return;
            }
          }
        }
      });

  };

//create the transaction

  Transaction.forge({
        totalEnergy: 0,
        totalCost: 0,
        paid: false
  })
  .save()
  .then(function(newTransaction){
        transactionID = newTransaction.id;
  })
  .catch(function(error){
    console.log('error saving transaction id', error);
  });

  // START RESERVATION PROCESS
  // Fetch user by request user id
  new User({
    username: req.user.id
  }).fetch()
  .then(function(user){
    // Find start timeSlot
    new TimeSlot({
      start: data.start.time
    }).fetch()
    .then(function(slot){
      startSlot = slot.id;
      // Find end timeslot
      new TimeSlot({
        end: data.end.time
      }).fetch()
      // Start making reservations for user
      .then(function(slot2){
        endSlot = slot2.id;
        newReservation(user.id, startSlot);
      });
    });
  });
};