var apiController = require('./api.controller.js');
var authController = require('../auth/auth.controller');

module.exports = function(app) {
  app.get('/user/:id', authController.isAuthenticated, apiController.getUserInfo);

  // View outlet information
  app.get('/outlets', authController.isAuthenticated, apiController.getAllOutlets);
  app.get('/users/manageMyOutlets', authController.isAuthenticated, apiController.getSellerOutlets);

  // Outlet creation
  app.post('/addOutlet', authController.isAuthenticated, apiController.addOutlet);
  app.post('/editOutlet', authController.isAuthenticated, apiController.editOutlet);
  app.post('/validateAddress', apiController.validateAddress);

  // Reservation management
  app.post('/outletReservations', authController.isAuthenticated, apiController.getAvailability);
  app.post('/makeReservation', authController.isAuthenticated, apiController.makeReservation);
  app.get('/users/seeBuyerReservations', authController.isAuthenticated, apiController.buyerReservations);

  // Control prototype and transaction
  app.post('/on', authController.isAuthenticated, apiController.turnOnOutlet);
  app.post('/setTransaction', authController.isAuthenticated, apiController.setTransaction);
  app.post('/off', authController.isAuthenticated, apiController.turnOffOutlet);
  app.get('/seeTimeSlots', authController.isAuthenticated, apiController.seeTimeSlots);
};

