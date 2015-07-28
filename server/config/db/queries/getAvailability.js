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
      res.send(201, reservations);
    });

  console.log('GET AVAILABILITY req.body: ', data, ' req.params: ', req.params);
  // res.send(201, req.body);

  //{id:1,outlet_id:5,seller_id:5,buyer_id:1,available:1,slot_id:1,date:2015-07-22,transaction_id:1}
}
