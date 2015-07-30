var authController = require('./auth.controller');
var passport = require('passport');

module.exports = function(app) {
  // console.log(app);

  app.get('/facebook',
    passport.authenticate('facebook', { scope: ['user_status', 'email','public_profile']}), function() {
      console.log('in auth');
    });

  app.get('/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/#/login'}),
    function(req, res) {
      res.redirect('/#/outlets');
    });

  app.get('/logout', function(req, res){
    req.logout();
    res.clearCookie('connect.sid');
    res.send('logged out');
  });

  // app.get('/turnOff', function(req, res){
  //   // Send here using sockets?
  // });
  
  // app.get('/api', authController.isAuthenticated, function(req, res){
  //   console.log('req', req.user.username);
    
  // });
  // routing for authentication
};
