var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var createUser = require('../config/db/queries/createUser.js');
var AuthConstants = require('../constants/serverConstants.js');

//passport support for persistent login sessions
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new FacebookStrategy({
    clientID: '495219237300819',
    clientSecret: '23f22aecd65f018fa01e14313c05e0aa',
    callbackURL:   AuthConstants.CALLBACK,
    profileFields:['id', 'displayName', 'photos', 'emails', 'profileUrl'],
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log('PROFEILLLLLLEEE------------>', profile)
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
    console.log('IS AUTHENITCATING---------------->');
    if (req.isAuthenticated()) {
      return next(); 
    }else{
      console.log('authentication failed - cannot move to next page   ');
      res.redirect('/#/login');
    }
  }
};

