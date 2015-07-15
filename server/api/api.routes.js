var apiController = require('./api.controller.js');

module.exports = function(app) {
  
  app.get('/', apiController.getAllOutlets);

}