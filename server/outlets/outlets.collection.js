var bookshelf = require('../config/db/config');
var Outlet = require('./outlet.model');
var Outlets = new bookshelf.Collection();

Outlets.model = Outlet;

module.exports = Outlets;