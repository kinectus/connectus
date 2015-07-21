var User = require('../../../users/user.model.js');

module.exports = getAllUsers = function(req, res){

  var id = req.params.id;
  return User.forge({
    id: id
  })
  .fetch()
  
};