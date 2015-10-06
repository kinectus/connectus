var db = require('../config');
var User = require('../../../users/user.model');
var TimeSlot = require('../../../reservations/timeSlot.model');
var Reservation = require('../../../reservations/reservation.model');
var Transaction = require('../../../transactions/transaction.model');
var moment = require('moment');
var transactionID;

module.exports = updateReservation = function(req, res){
  var data = req.body;

  // Track reservation update by date and time slot
  var currentDate = moment( data.start.date, 'YYYY-MM-DD' );
  var stringDate = currentDate.format('YYYY-MM-DD');
  var endDate = moment( data.end.date, 'YYYY-MM-DD' );
  var currentSlot, endSlot;
  var validReservations = true;

  // Store information for reservation update
  var transactionID, buyerID;

  // START RESERVATION PROCESS
  var startID, endID;

  return new User({
    username: req.user.id
  }).fetch()
  .then(function(user){  
    buyerID = user.id;
    // Find start reservation by request's start time and date
    return new TimeSlot({
      start: data.start.time
    })
    .fetch().then(function(slot){
      return new Reservation({
        outlet_id: data.outletID,
        date: data.start.date,
        slot_customID: slot.attributes.customID
      })
      .fetch().then(function(startRes){
        // Find end reservation by request's end time and date
        return new TimeSlot({
          end: data.end.time
        })
        .fetch().then(function(slot2){
          return new Reservation({
            outlet_id: data.outletID,
            date: data.end.date,
            slot_customID: slot2.attributes.customID
          })
          .fetch().then(function(endRes){
            var dateQuery = "date between DATE_SUB('"+data.start.date+"', interval 1 day) AND DATE_ADD('"+data.end.date+"', INTERVAL 1 DAY)";

            // Create a transaction and associate it with all reservations taken by user
            return new Transaction({
              totalEnergy: 0,
              totalCost: 0,
              paid: 0,
              current: 0
            }).save().then(function(newTransaction){
              transactionID = newTransaction.get('id');
              // Query for collection of all reservations between start and end reservation, inclusive
              return new Reservation()
              .query(function(qb){
                qb.where('outlet_id', data.outletID)
                qb.where(db.knex.raw(dateQuery))
              })
              .fetchAll().then(function(reservations){
                for (var i = 0; i<reservations.length; i++){
                  if ( !reservations.models[i] ){
                    continue;
                  }
                  // if reservation date is start date, if slot is < start time, ignore
                  if ( moment(reservations.models[i].attributes.date).diff( moment(data.start.date) ) < 0 || moment(reservations.models[i].attributes.date).diff( moment(data.start.date) ) === 0 && reservations.models[i].attributes.slot_customID < slot.attributes.customID){
                    reservations.models = reservations.models.slice(0,i).concat( reservations.models.slice(i+1) );
                    i--;
                    continue;
                  }
                  // if reservation date is end date, if slot is > end time, ignore
                  if ( moment(reservations.models[i].attributes.date).diff( moment(data.end.date) ) > 0 || moment(reservations.models[i].attributes.date).diff( moment(data.end.date) ) === 0 && reservations.models[i].attributes.slot_customID > slot2.attributes.customID){
                    reservations.models = reservations.models.slice(0,i).concat( reservations.models.slice(i+1) );
                    i--;
                    continue;
                  }
                  // if reservation has been taken, reservation is invalid (extra protection despite front-end validation)
                  if(reservations.models[i].attributes.available === 0){
                    validReservations = false;
                  }
                }

                if(!validReservations){
                  return 'not valid'
                } else {
                  // Associate transaction and user as buyer of each reservation, set each reservation as unavailable to future users
                  return reservations.mapThen(function(reservation){
                    return reservation.set({
                      buyer_id: buyerID,
                      available: false,
                      transaction_id: transactionID
                    }).save();
                  })
                  .then(function(modelBase){
                    return modelBase
                  });
                }
              });
            });
          });
        });
      });
    });
  });

};