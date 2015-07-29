var app = require('./config/middleware');

var setRealtimeData= require('./config/db/queries/setRealtimeTransactionData');

var port = process.env.PORT || 3000;
// var db = require('./db/config.js');

// Setting up socket IO 
var server = app.listen(port);
var io = require('socket.io').listen(server);

var mySocket;

io.on('connection', function(socket){
  console.log('connected --------------------------------------------------------')
  mySocket = socket;
})

app.post('/realtimeData', function(req, res){
  // console.log('in the realtimeData post', req.body)
  var transactionId = req.body.clientData.id+'';
  mySocket.emit(transactionId, req.body);
  
  // add to DB
  setRealtimeData(req.body);
})

console.log('Connectus is listening on port ' + port + '...');

// module.exports = io;


