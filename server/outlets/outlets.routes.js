var authController = require('../auth/auth.controller.js');

module.exports = function(app) {
  console.log(app);
  app.get('/outlets', authController.isAuthenticated, function(req, res){
    console.log('checked to see if user was authenitcated before outlets');
  });
  
  // app.get('/api', authController.isAuthenticated, function(req, res){
  //   console.log('req', req.user.username);
    
  // });
  // routing for authentication
};


