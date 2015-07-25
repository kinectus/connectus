var app = require('./config/middleware');

var port = process.env.PORT || 3000;
// var db = require('./db/config.js');

// Setting up socket IO 
var server = app.listen(port);
var io = require('socket.io').listen(server);

// var socketFunc = {
//   listener: function() {
//     io.on('connection', function(socket) {
//         socket.emit('energy', 'hi')
//     });
//   }
// }

console.log('Connectus is listening on port ' + port + '...');

// module.exports = socketFunc;
module.exports = io;


