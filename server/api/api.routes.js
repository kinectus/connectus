var apiController = require('./api.controller.js');
var authController = require('../auth/auth.controller');

module.exports = function(app) {
  app.post('/checkout', authController.isAuthenticated, apiController.checkout);
  app.post('/setTransaction', authController.isAuthenticated,apiController.setTransaction);
  app.get('/client_token', authController.isAuthenticated, apiController.client_token);
  app.get('/outlets', authController.isAuthenticated, apiController.getAllOutlets);
  app.get('/user/:id', authController.isAuthenticated, apiController.getUserInfo);
  app.get('/users/manageMyOutlets', authController.isAuthenticated, apiController.getSellerOutlets);
  app.get('/seeTimeSlots', authController.isAuthenticated, apiController.seeTimeSlots);
  app.post('/outletReservations', authController.isAuthenticated, apiController.getAvailability);
  app.post('/addOutlet', authController.isAuthenticated, apiController.addOutlet);
  app.post('/makeReservation', authController.isAuthenticated, apiController.makeReservation);
  app.get('/users/seeBuyerReservations', authController.isAuthenticated, apiController.buyerReservations);
  app.post('/on', authController.isAuthenticated, apiController.turnOnOutlet);
};
