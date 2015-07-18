var bookshelf = require('../config/db/config');
var User = require('../users/user.model');
var Outlet = require('../outlets/outlet.model');
var Reservation = require('../reservations/reservation.model');

var Transaction = bookshelf.Model.extend({
  tableName: 'transactions',
  reservation: function(){
    return this.hasOne('Reservation');
  }
});

module.exports = Transaction;
