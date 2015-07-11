var bookshelf = require('../config/config');
var Outlet = require('../outlets/outlet.model');

var User = bookshelf.Model.extend({
  tableName: 'users'
});

User.hasMany('Outlet');
User.hasMany('Transaction');

module.exports = User;
