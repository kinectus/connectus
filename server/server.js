var app = require('./config/middleware');

var port = process.env.PORT || 3000;
// var db = require('./db/config.js');

// Setting up socket IO 
var server = app.listen(port);
var io = require('socket.io').listen(server);

var mySocket;

io.on('connection', function(socket){
  mySocket = socket;
})

app.post('/realtimeData', function(req, res){
  console.log('in the realtimeData post', req.body.reservation)
  mySocket.emit('energy', req.body)
})

console.log('Connectus is listening on port ' + port + '...');

// module.exports = io;


