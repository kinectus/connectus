var User = require('../../../users/user.model.js');
var Outlet = require('../../../outlets/outlet.model.js');
var Promise = require('bluebird');
var Reservation = require('../../../outlets/outlet.model.js');


module.exports = findCurrentTransaction = function(user){
  return User.forge({
    username: user
  })
  .fetch()
  .then(function(user){
    console.log('user', user);
    return user.reservations().fetch({withRelated: ['transaction_current']});
  })
  .then(function(reservations){
    for(var key in reservations._byId){
      if(reservations._byId[key].relations.transaction_current.attributes.current==='1'){
        console.log(reservations._byId[key]);
        return reservations._byId[key];
      }
    }
    return reservations;
  });

};