var bookshelf = require('../config/db/config');
var Outlet = require('../outlets/outlet.model');
var Reservation = require('../reservations/reservation.model');

var User = bookshelf.Model.extend({
  tableName: 'users',
  outlets: function() {
    return this.hasMany(Outlet, 'seller_id');
  },
  reservations: function(){
  	var Reservation = require('../reservations/reservation.model');
    return this.hasMany(Reservation, 'buyer_id');
  }
});

module.exports = User;
