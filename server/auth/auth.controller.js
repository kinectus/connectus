var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var createUser = require('../config/db/queries/createUser.js');

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
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields:['id', 'displayName', 'photos', 'emails', 'profileUrl'],
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, 'user');
    console.log('PROFEILLLLLLEEE------------>', profile)
    //user is saved to the database here - see queries folder for the specific db query
    createUser(profile, function(error){
      console.log(error);
    });
  }
));


module.exports = {
  isAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next(); 
    }

    res.redirect('/#/signin')
  }
};

