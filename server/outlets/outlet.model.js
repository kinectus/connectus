var bookshelf = require('../config/db/config');
var User = require('../users/user.model');
var Transaction = require('../transactions/transaction.model');

var Outlet = bookshelf.Model.extend({
  tableName: 'outlets',
  defaults: {
    priceHourly: 3.00,
    priceSuggest: 10.00,
    lat: 37.783624,
    long: -122.408999
  },
  seller_id: function() {
    return this.belongsTo(User); // trying to find converse in User model
  }
});

module.exports = Outlet;
