var User = require('../../../users/user.model.js');
var Outlet = require('../../../outlets/outlet.model.js');

var data = {};
var outlets = {};
var i = 0;
module.exports = getBuyerReservations = function(user, next){
  console.log('user', user.id);
  function addDataOutlets(outlet_id, reservations){
    if(!outlets[outlet_id]){
      Outlet.forge({
        id: outlet_id
      })
      .fetch()
      .then(function(outlet){
        outlets[outlet_id] = outlet;
        console.log('outlets being changed', outlets);
        i++;
        return outlets;
      })
      .then(function(outlets){
        console.log('outlets that should be passed through------->', outlets);
        getOutletId(reservations, outlets);
      });
    }
  };
 
  function getOutletId(reservations, outlets){
     var resModels = reservations.models;
     console.log('outlets being passed through', outlets);
     if(i < resModels.length){
       addDataOutlets(resModels[i].outlet_id, reservations);
     }else{
       data.outlets = outlets;
       return outlets;
     }
  };
  
  User.forge({
    username: user.id
  })
  .fetch()
  .then(function(user){
	  return user.reservations()
    .fetch();
  })
  .then(function(reservations){
    data.reservations = reservations.models;
    while(i < reservations.models.length){
		  getOutletId(reservations, null);
    }
    data.outlets = outlets;
    return data;
  })
  // .then(function(outlets){
  //   data.outlets = outlets;
  //   console.log('THIS IS THE FINAL DATA ------------->', data);
  //   return data;
  // })
  .catch(function(error){
    next(error);
  });
};