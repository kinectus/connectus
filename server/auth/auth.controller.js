var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var createUser = require('../config/db/queries/createUser.js');
var AuthConstants = require('../constants/serverConstants.js');
var config = require('../config/configKeys.js');

//passport support for persistent login sessions
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new FacebookStrategy({
    clientID: config.facebookClientId,
    clientSecret: config.facebookClientSecret,
    callbackURL:   AuthConstants.CALLBACK,
    profileFields:['id', 'displayName', 'photos', 'emails', 'profileUrl'],
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    //user is saved to the database here - see queries folder for the specific db query
    createUser(profile, function(error){
      console.log(error);
    });

    // in this done function, passport adds facebook user profile to req so it can be accessed anywhere in express
    return done(null, profile);
  }
));

module.exports = {
  isAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next(); 
    }else{
      res.redirect('/#/login');
    }
  }
};

