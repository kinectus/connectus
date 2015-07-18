var bookshelf = require('../config/db/config');
var Outlet = require('../outlets/outlet.model');
var User = require('../users/user.model');
var Transaction = require('../transactions/transaction.model');
var Reservation = require('../reservations/reservation.model');


var TimeSlot = bookshelf.Model.extend({
  tableName: 'timeSlots',
  reservation: function(){
	  return this.hasOne('Reservation');
  }
});

module.exports = TimeSlot;
