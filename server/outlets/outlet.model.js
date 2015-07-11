var bookshelf = require('../config/config');
var User = require('../users/user.model');
var Transaction = require('../transactions/transaction.model');

var Outlet = bookshelf.Model.extend({
  tableName: 'outlets',
  seller: function() {
    return this.belongsTo(User, 'seller_id'); // trying to find converse in User model
  },
  buyer: function() {
    return this.belongsTo(User, 'buyer_id');
  }
});

Outlet.hasMany('Transaction');

module.exports = Outlet;
