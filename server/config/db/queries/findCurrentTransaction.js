var User = require('../../../users/user.model.js');
var Outlet = require('../../../outlets/outlet.model.js');
var Promise = require('bluebird');
var Reservation = require('../../../outlets/outlet.model.js');


module.exports = findCurrentTransaction = function(user, next){
  //given the user id, query transactions where the 
  console.log('finding current reservations');
  return User.forge({
    username: user
  })
  .fetch({withRelated: ['reservations']})
  .then(function(user){
    console.log(user.related('reservations').toJSON());
  });

};