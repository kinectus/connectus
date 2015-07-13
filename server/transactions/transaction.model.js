var bookshelf = require('../config/config');
var User = require('../users/user.model');
var Outlet = require('../outlets/db/outlet.model');

var Transaction = bookshelf.Model.extend({
  tableName: 'transactions',
  seller: function() {
    return this.belongsTo(User, 'seller_id'); // trying to find converse in User model
  },
  buyer: function() {
    return this.belongsTo(User, 'buyer_id');
  },
  outlet: function() {
    return this.belongsto(Outlet, 'outlet_id');
  }
});

module.exports = Transaction;
