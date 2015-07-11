var bookshelf = require('../config/config');

var User = bookshelf.Model.extend({
  tableName: 'users'
});

// User.hasMany('Outlet');

module.exports = User;
