var bookshelf = require('../config/config');
var User = require('../users/user.model');

var Transaction = bookshelf.Model.extend({
  tableName: 'transactions',
  seller: function() {
    return this.belongsTo(User, 'seller_id'); // trying to find converse in User model
  },
  buyer: function() {
    return this.belongsTo(User, 'seller_id');
  }
});

module.exports = Transaction;
