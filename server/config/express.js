var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./config');
// include morgan, 

module.exports = function() {
  var app = express();
  //app.use(morgan('dev'));
  //app.use(bodyParser.json());
  app.use(express.static( path.join( __dirname + '/../dist') ) );

  return app;
}
