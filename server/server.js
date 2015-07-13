//added
var express = require('./config/middleware');

var app = express();
var port = process.env.PORT || 3000;
// var db = require('./db/config.js');
app.listen(port);

console.log('Connectus is listening on port ' + port + '...');
module.exports = app;


