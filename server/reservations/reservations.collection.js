var Bookshelf = require('../config/db/config');
var Reservation = require('./reservation.model');
var Outlet = require('../outlets/outlet.model');
var Reservations = new Bookshelf.Collection();

Reservations.model = Reservation;



module.exports = Reservations;