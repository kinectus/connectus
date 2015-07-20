var apiController = require('./api.controller.js');
var authController = require('../auth/auth.controller');

module.exports = function(app) {
  
  app.get('/outlets', authController.isAuthenticated, apiController.getAllOutlets);
  app.get('/users/:id', authController.isAuthenticated, apiController.getUserInfo);
  app.get('/users/manageMyOutlets', authController.isAuthenticated, apiController.getSellerOutlets);
  app.post('/addOutlet', authController.isAuthenticated, apiController.addOutlet);
  app.post('/makeReservation', authController.isAuthenticated, apiController.makeReservation);
 
  app.get('/users/manageMyReservations', authController.isAuthenticated, apiController.buyerReservations);
}