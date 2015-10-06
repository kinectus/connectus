var User = require('../../../users/user.model.js');

module.exports = getOutletsByUser = function(user, next){
  
  return User.forge({
    username: user.id
  })
  .fetch()
  .then(function(user){
    return user.outlets()
    .fetch();
  })
  .then(function(outlets){
    return outlets;
  })
  .catch(function(error){
    next(error);
  });
};