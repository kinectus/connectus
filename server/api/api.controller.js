var db = require('../config/db/config');
var Outlets = require('../outlets/outlets.collection');

module.exports = {

  getAllOutlets: function(req, res) {
    Outlets.reset().fetch().then(function(outlets) {
      res.send(outlets)
    })
    .catch(function(error) {
      console.log('error:', error);
    });
  }

};