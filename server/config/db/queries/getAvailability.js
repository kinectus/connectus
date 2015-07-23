var Outlet = require('../../../outlets/outlet.model');
var Reservation = require('../../../reservations/reservation.model');

module.exports = getAvailability = function(req, res){
  var id = req.body.outletID;
  // return new Outlet()
  //   .query({where: {id: id} })
  //   .fetch()
  //   .then(function(outlet){
  //     console.log('outlet found: ', outlet)
  //   })

  return new Reservation()
    .query({where: {outlet_id: id} })
    .fetchAll()
    .then(function(reservations){
      // Object.keys(reservations).forEach(function(key){
      //   console.log('key: ', key, 'available: ', reservations[key].attributes.available,'date: ', reservations[key].attributes.date, ' slotID: ', reservations[key].attributes.slot_id);
      // });
      // console.log(reservations.toString().slice(0,100));
      res.send(201, reservations);
    });

  // .then(function(user){
  //   return user.outlets()
  //   .fetch();
  // })
  // .then(function(outlets){
  //   console.log(outlets);
  //   return outlets;
  // })
  // .catch(function(error){
  //   next(error);
  // });
  console.log('GET AVAILABILITY req.body: ', data, ' req.params: ', req.params);
  // res.send(201, req.body);

  //{id:1,outlet_id:5,seller_id:5,buyer_id:1,available:1,slot_id:1,date:2015-07-22,transaction_id:1}
}
