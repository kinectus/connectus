var bookshelf = require('../config/config');

var Outlet = bookshelf.Model.extend({
  tableName: 'outlets'
});

module.exports = Outlet;
