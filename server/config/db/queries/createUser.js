var User = require('../../../users/user.model.js');

module.exports = createUser = function (user, next){

  return User.forge({
    username: user.id
  })
  .fetch()
  .then(function(userExists){
    if(userExists) {
      throw new Error('User already Exists!')
    }
    console.log('creating user');
    User.forge({
      username: user.id,
      fullname: user.displayName,
      email: user.emails[0].value,
      profileImage: user.photos[0].value,
      profileUrl: user.profileUrl
    })
    .save();
  })
  .catch(function(error){
    next(error);
  });
};