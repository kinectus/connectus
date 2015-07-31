var db = require('../config');
var User = require('../../../users/user.model');
var TimeSlot = require('../../../reservations/timeSlot.model');
var Reservation = require('../../../reservations/reservation.model');
var Transaction = require('../../../transactions/transaction.model');
var moment = require('moment');
var transactionID;

module.exports = updateReservation = function(req, res){
  var data = req.body;

  // Date and time tracking, completion tracking
  var currentDate = data.start.date;
  var endDate = data.end.date;
  var currentSlot, endSlot;
  var complete = false;
  // Determine id step for clearDB
  if (process.env.NODE_ENV === 'development'){
    var min = 1;
    var max = 48;
    var step = 10;
  } else {
    var min = 2;
    var max = 472;
    var step = 10;
  }

  // Recursive function updates reservation slots and creates transaction models for each
  // time slot from beginning to end 
  var newReservation = function(user, passedSlot){
    currentDate = currentDate || startDate;

    // Find reservation
    new Reservation()
    .query({where: {outlet_id: data.outletID, slot_id: passedSlot, date: currentDate} })
    .fetch()

    // Update reservation
    .then(function(newReservation){
      if (!newReservation) {
        is404 = true;
        complete = true;
        return;
      } else if (newReservation.available == false) {
        is404 = true;
        complete = true;
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
      // Update slot and day (if necessary)
      // Determine if reservations should continue

      currentSlot = currentSlot < max ? currentSlot += step : min;
      currentDate = currentSlot === min ? moment(currentDate).add(1, 'days').format('YYYY-MM-DD').toString() : currentDate;
      var difference = moment(currentDate).diff(moment(endDate));
      // console.log('startDate: ', startDate, ', endDate: ', endDate, ', currentDate: ', currentDate, ', difference: ', difference);
      console.log('currentSlot: ', currentSlot, 'currentDate', currentDate)
      if ( difference <= 0 ){
        if ( currentSlot <= endSlot  || difference < 0){
          return newReservation(user, currentSlot);
        } else {
          complete = true;
          return;
        }
      }
    })
    // Send response if complete
    .then(function(){
      if (complete === true && !is404){
        return res.send(201, JSON.stringify('Reservation complete'));
      } else if (complete === true && is404) {
        return res.send(404, JSON.stringify('Cannot complete reservation'));
      }
    });

  };


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
      currentSlot = slot.id;
      // Find end timeslot
      new TimeSlot({
        end: data.end.time
      }).fetch()
      // Start making reservations for user
      .then(function(slot2){
        endSlot = slot2.id;

        Transaction.forge({
              totalEnergy: 0,
              totalCost: 0,
              paid: false,
              current: false
        })
        .save()
        .then(function(newTransaction){
          transactionID = newTransaction.id;
          complete = false;
          return newReservation(user.id, currentSlot);
        });
      });
    });
  });
};
