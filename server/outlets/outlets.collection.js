var Bookshelf = require('../config/db/config');
var Outlet = require('./outlet.model');
var Outlets = new Bookshelf.Collection();

Outlets.model = Outlet;

module.exports = Outlets;