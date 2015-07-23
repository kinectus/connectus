var Outlet = require('../../../outlets/outlet.model');

module.exports = getAvailability = function(req, res){
  var id = req.body.outletID;
  return new Outlet()
    .query({where: {id: id} })
    .fetch()
    .then(function(outlet){
      console.log('outlet found: ', outlet)
    })
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
  res.send(201, req.body);

  //{id:1,outlet_id:5,seller_id:5,buyer_id:1,available:1,slot_id:1,date:2015-07-22,transaction_id:1}
}
