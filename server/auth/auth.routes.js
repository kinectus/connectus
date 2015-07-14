var authController = require('./auth.controller');
var passport = require('passport');

module.exports = function(app) {
  // app.get('/api', authController.isAuthenticated, function(req, res){
  //   console.log('req', req.user.username);
    
  // });
  // routing for authentication
  console.log(app);
  app.get('/auth/facebook',
    passport.authenticate('facebook'), function() {
      console.log('in auth');
    }
  );

  app.get('/auth/facebook/callback',

    // check with valerie for login path
    passport.authenticate('facebook', {
      successRedirect: '/#/landingPage',
      failureRedirect: '/#/login'
    })
    // function(req, res) {
    //   // Successful authentication, redirect home.
    //   console.log('authenticated');
    //   res.redirect('/');
    // }
    );

  app.get('/auth/logout', function(req, res){
    req.logout();
    res.redirect('/#/login');
  });
};
