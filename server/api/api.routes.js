var apiController = require('./api.controller.js');
var authController = require('../auth/auth.controller');

module.exports = function(app) {
  
  app.get('/outlets', authController.isAuthenticated, apiController.getAllOutlets);
  app.get('/manageMyOutlets', authController.isAuthenticated, apiController.getSellerOutlets);
  app.post('/addOutlet', authController.isAuthenticated, apiController.addOutlet);
  app.post('/addTransaction', authController.isAuthenticated, apiController.addTransaction);

}