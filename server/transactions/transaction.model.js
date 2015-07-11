var bookshelf = require('../config/config');

var Transaction = bookshelf.Model.extend({
  tableName: 'transactions',
  seller: function() {
    return this.belongsTo(User); // trying to find converse in User model
  },
  buyer: function() {
    return this.belongsTo(User);
  }
});

module.exports = Transaction;
