var User = require('../../../users/user.model.js');
var Outlet = require('../../../outlets/outlet.model.js');
var Promise = require('bluebird');
var Reservation = require('../../../outlets/outlet.model.js');

// var data = {};
// var i = 0;
module.exports = getBuyerReservations = function(user, res){
  console.log('user', user.id);

  //while i < reservations.length
    //go through first reservation, then add query
  // function addOutletInfo (reservations){
  //   return Outlet.forge({
  //     id: reservations.models[i].attributes.outlet_id
  //   })
  //   .fetch()
  //   .then(function(outlet){
  //     reservations.models[i].attributes.outlet_info = outlet;
  //     console.log('reservations after saving outlet info---------->', reservations.models[i].attributes);
  //     i++;
  //     return reservations;
  //   })
  //   .then(function(reservations){
  //     if(i < reservations.models.length) {
  //       addOutletInfo(reservations);
  //     }else{
  //       data.reservations = reservations;
  //       return data;
  //     }
  //   })
  //   .catch(function(error){
  //     console.log('error found in saving outletInfo', error);
  //   });
  // };
  // function addDataOutlets(outlet_id, reservations){
  //   if(!outlets[outlet_id]){
  //     Outlet.forge({
  //       id: outlet_id
  //     })
  //     .fetch()
  //     .then(function(outlet){
  //       outlets[outlet_id] = outlet;
  //       console.log('outlets being changed', outlets);
  //       i++;
  //       return outlets;
  //     })
  //     .then(function(outlets){
  //       console.log('outlets that should be passed through------->', outlets);
  //       getOutletId(reservations, outlets);
  //     });
  //   }
  // };
 
  // function getOutletId(reservations, outlets){
  //    var resModels = reservations.models;
  //    console.log('outlets being passed through', outlets);
  //    if(i < resModels.length){
  //      addDataOutlets(resModels[i].outlet_id, reservations);
  //    }else{
  //      data.outlets = outlets;
  //      return outlets;
  //    }
  // };
  
  User.forge({
    username: user.id
  })
  .fetch()
  .then(function(user){
	  return user.reservations()
    .fetch()
    // .then(function(reservations){
    //   console.log(reservations);
    // });
	  .then(function(reservations){
	    return reservations.mapThen(function(reservation){
        return reservation.outlet().fetch()
        .then(function(outlet){
          return reservation.outlet_info = outlet;
        });
      })
      .then(function(modifiedRes){
        res.send(JSON.stringify(modifiedRes));
      });
		});
  })
  .catch(function(error){
    console.log(error);
  });
};