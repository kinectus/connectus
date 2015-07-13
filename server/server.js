//added
var middleware = require('./config/middleware');

var app = middleware();
var port = process.env.PORT || 3000;
// var db = require('./db/config.js');
app.listen(port);

console.log('Connectus is listening on port ' + port + '...');
module.exports = app;


