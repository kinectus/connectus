var bookshelf = require('../config/config');

var User = bookshelf.Model.extend({
  tableName: 'users'
});

module.exports = User;
