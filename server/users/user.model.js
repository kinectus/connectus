var bookshelf = require('../config/db/config');
var Outlet = require('../outlets/outlet.model');

var User = bookshelf.Model.extend({
  tableName: 'users',
  outlet: function() {
    return this.hasMany(Outlet);
  }
});

module.exports = User;
