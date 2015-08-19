var Outlet = require('../../../outlets/outlet.model');
var Reservation = require('../../../reservations/reservation.model');
var db = require('../config.js');

module.exports = getAvailability = function(req, res){
  var id = req.body.outletID;
  return new Reservation()
    .query(function(qb){
      qb.where('outlet_id', id)
      qb.where(db.knex.raw("date >= CURDATE()"))
    })
    .fetchAll()
    .then(function(reservations){
      res.status(200).send(reservations);
    });
}
