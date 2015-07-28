var User = require('../../../users/user.model.js');

module.exports = getAllUsers = function(req, res){

  var id = req.params.id;
  return new User()
  .query({ where: {id: id} } )
  .fetch()
  
};