var apiController = require('./api.controller.js');

module.exports = function(app) {
  
  app.get('/outlets', apiController.getAllOutlets);

  app.post('/addOutlet', apiController.addOutlet);
  app.post('/addTransaction', apiController.addTransaction);

}