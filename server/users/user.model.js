var bookshelf = require('../config/config');
var Outlet = require('../outlets/outlet.model');

var User = bookshelf.Model.extend({
  tableName: 'users',
  outlet: function() {
    return this.hasMany('Outlet');
  },
  transaction: function() {
    return this.hasMany('Transaction');
  }
});

module.exports = User;
