var bookshelf = require('../config/db/config');
var Outlet = require('../outlets/outlet.model');

var User = bookshelf.Model.extend({
  tableName: 'users',
  outlets: function() {
    return this.hasMany(Outlet, 'seller_id');
  }
});

module.exports = User;
