var db = require('../config');
var User = require('../../../users/user.model');
var TimeSlot = require('../../../reservations/timeSlot.model');
var Reservation = require('../../../reservations/reservation.model');
// var Reservations = require('../../../reservations/reservations.collection');
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

  // Store information for reservation update
  var transactionID, buyerID;

  // START RESERVATION PROCESS
  var startID, endID;

  new User({
    username: req.user.id
  }).fetch()
  .then(function(user){  
    buyerID = user.id;
    // Find start res
    return new TimeSlot({
      start: data.start.time
    })
    .fetch().then(function(slot){
      return new Reservation({
        outlet_id: data.outletID,
        date: data.start.date,
        slot_id: slot.id
      })
      .fetch().then(function(startRes){
        startID = startRes.get('id');
        startID = 'id >= '+startID.toString();
        // Find end res
        return new TimeSlot({
          end: data.end.time
        })
        .fetch().then(function(slot2){
          return new Reservation({
            outlet_id: data.outletID,
            date: data.end.date,
            slot_id: slot2.id
          })
          .fetch().then(function(endRes){
            endID = endRes.get('id');
            endID = 'id <= '+endID.toString();
            var rangeQuery = startID+' AND '+endID;

            return new Transaction({
              totalEnergy: 0,
              totalCost: 0,
              paid: 0,
              current: 0
            }).save().then(function(newTransaction){
              transactionID = newTransaction.get('id');
              // Query for collection of all reservations between start and end reservation, inclusive
              new Reservation()
              .query(function(qb){
                qb.where('outlet_id', data.outletID)
                qb.where(db.knex.raw(rangeQuery))
              })
              .fetchAll().then(function(reservations){
                return reservations.mapThen(function(reservation){
                  return reservation.set({
                    buyer_id: buyerID,
                    available: false,
                    transaction_id: transactionID
                  }).save()
                })
                .then(function(){
                  res.send(201, JSON.stringify('Posted'));
                })
              });
            });
          });
        });
      });
    });
  });

};