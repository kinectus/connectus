var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var app = require('../server.js');


passport.use(new FacebookStrategy({
    clientID: '495219237300819',
    clientSecret: '23f22aecd65f018fa01e14313c05e0aa',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

// routing for authentication

// app.get('/auth/facebook',
//   passport.authenticate('facebook'), function() {
//     console.log('in auth');
//   }
// );

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     console.log('authenticated');
//     res.redirect('/');
//   });

