var User = require('../../../users/user.model.js');
var Outlet = require('../../../outlets/outlet.model.js');

module.exports = getBuyerReservations = function(user, next){
  console.log('user', user.id);
  User.forge({
    username: user.id
  })
  .fetch()
  .then(function(user){
	  return user.reservations()
    .fetch();
  })
  .then(function(reservations){
    return reservations;
  })
  .catch(function(error){
    next(error);
  });
};