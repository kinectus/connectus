var bookshelf = require('../config/config');

var Transaction = bookshelf.Model.extend({
  tableName: 'transactions'
});

module.exports = Transaction;
