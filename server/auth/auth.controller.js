var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.


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
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, 'user');
    // example code
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));


module.exports = {
  isAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next(); 
    }

    // check with Valerie for correct signin
    res.redirect('/#/signin')
  }
}

