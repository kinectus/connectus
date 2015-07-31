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

  // Determine id step for clearDB
  console.log('process.env.PORT: ', process.env.PORT);
  if (process.env.PORT === undefined){
    var min = 1;
    var max = 48;
    var step = 1;
  } else if (process.env.PORT){
    var min = 2;
    var max = 472;
    var step = 10;
  }

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
      console.log('INFO FOR STARTRES: ')
      console.log('outlet_id: ', data.outletID, ' date: ', data.start.date, ' slot_id: ', slot.id);
      return new Reservation({
        outlet_id: data.outletID,
        date: data.start.date,
        slot_id: slot.id
      })
      .fetch().then(function(startRes){
        console.log('STARTRES: ', startRes);
        startID = startRes.get('id');
        startID = 'id >= '+startID.toString();
        // Find end res
        return new TimeSlot({
          end: data.end.time
        })
        .fetch().then(function(slot2){
          console.log('INFO FOR ENDRES: ')
          console.log('outlet_id: ', data.outletID, ' date: ', data.end.date, ' slot_id: ', slot2.id);
          return new Reservation({
            outlet_id: data.outletID,
            date: data.end.date,
            slot_id: slot2.id
          })
          .fetch().then(function(endRes){
            console.log('ENDRES: ', endRes);
            endID = endRes.get('id');
            endID = 'id <= '+endID.toString();
            var rangeQuery = startID+' AND '+endID;
            console.log('rangeQuery ', rangeQuery);
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
                }).save().then(function(res){
                  console.log('got a res: ', res.id);
                })
              });
            });
          });
        });
      });
    });
  });

};




  // new User({
  //   username: req.user.id
  // }).fetch()
  // .then(function(user){
  //   // Find start timeSlot
  //   console.log('DATA: ', data);
  //   new TimeSlot({
  //     start: data.start.time
  //   }).fetch()
  //   .then(function(slot){
  //     console.log('SLOT: ', slot)
  //     currentSlot = slot.id;
  //     // Find end timeslot
  //     new TimeSlot({
  //       end: data.end.time
  //     }).fetch()
  //     // Create transaction
  //     .then(function(slot2){
  //       console.log('SLOT2: ', slot2)
  //       endSlot = slot2.id;

  //       Transaction.forge({
  //         totalEnergy: 0,
  //         totalCost: 0,
  //         paid: false,
  //         current: false
  //       })
  //       .save()
  //       // Start making reservations for user
  //       .then(function(newTransaction){
  //         transactionID = newTransaction.id;

  //         console.log('DATA: ', data);

          


  //         // // var toUpdate = [];
  //         // while( currentSlot <= endSlot || currentDate.diff(endDate) < 0){
  //         //   // // toUpdate.push(
  //         //   //   new Reservation({
  //         //   //     outlet_id: data.outletID,
  //         //   //     slot_id: currentSlot,
  //         //   //     date: stringDate
  //         //   //   }).fetch()
  //         //   // // );

  //         //   currentSlot = currentSlot < max ? currentSlot+step : min;
  //         //   currentDate = currentSlot > min ? currentDate : currentDate.add(1, 'days');
  //         // }


  //         // console.log(toUpdate);
  //         // toUpdate.mapThen(function(reservation){
  //         //   return reservation.set({
  //         //     buyer_id: buyerID,
  //         //     available: false,
  //         //     transaction_id: transactionID
  //         //   })
  //         //   .save()
  //         //   .then(function() {
  //         //     console.log( reservation.get('id') + '-saved' );
  //         //   });
  //         // });

  //       });
      // });
    // });
  // });
