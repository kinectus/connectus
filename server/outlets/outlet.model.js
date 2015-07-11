var bookshelf = require('../config/config');

var Outlet = bookshelf.Model.extend({
  tableName: 'outlets',
  seller: function() {
    return this.belongsTo(User); // trying to find converse in User model
  },
  buyer: function() {
    return this.belongsTo(User);
  }
});

module.exports = Outlet;
