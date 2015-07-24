var bookshelf = require('../config/db/config');
var Outlet = require('../outlets/outlet.model');
var User = require('../users/user.model');
var Transaction = require('../transactions/transaction.model');
var TimeSlot = require('./timeSlot.model');

var Reservation = bookshelf.Model.extend({
  tableName: 'reservations',
  buyer: function() {
    return this.belongsTo(User, 'buyer_id');
  },
  seller: function() {
    var User = require('../users/user.model');
    return this.belongsTo(User, 'seller_id');
  },
  outlet: function() {
    var Outlet = require('../outlets/outlet.model');
    return this.belongsTo(Outlet, 'outlet_id');
  },
  timeSlot: function() {
    return this.belongsTo(TimeSlot, 'slot_id');
  },
  transaction_current: function() {
    var Transaction = require('../transactions/transaction.model');
    return this.belongsTo(Transaction, 'transaction_id').query({where: {current:true}});
  },
});

module.exports = Reservation;
