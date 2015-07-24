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
  .fetch()
  .then(function(user){
    return user.reservations().fetch({withRelated:['transaction_current']});
  })
  .then(function(reservations){
    // console.log('resrvations2', reservations);
    return reservations;
  });

};