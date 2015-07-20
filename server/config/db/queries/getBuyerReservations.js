var User = require('../../../users/user.model.js');
var Outlet = require('../../../outlets/outlet.model.js');


module.exports = getBuyerReservations = function(user, res){
  console.log('user', user.id);
  
  User.forge({
    username: user.id
  })
  .fetch()
  .then(function(user){
	  return user.reservations()
    .fetch()
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