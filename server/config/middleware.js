var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./db/config');
require('../auth/auth.controller');

var app = express();
app.use(express.static(path.join( __dirname + '/../../dist')));

module.exports = app;
