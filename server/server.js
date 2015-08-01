var app = require('./config/middleware');

var setRealtimeData= require('./config/db/queries/setRealtimeTransactionData');
var getTransactionData= require('./config/db/queries/getTransactionData');

var port = process.env.PORT || 3000;

// Setting up socket IO 
var server = app.listen(port);
var io = require('socket.io').listen(server);

var mySocket;

io.on('connection', function(socket){
  mySocket = socket;
});

app.post('/realtimeData', function(req, res){
  var transactionId = req.body.clientData.id + '';
  res.status(200).send('you hit realtimeData');
  setRealtimeData(req.body)
  .then(function(){
    getTransactionData(req.body)
    .then(function(transactionData) {
      req.body.totalKwh = transactionData.attributes.totalEnergy;
      req.body.totalCost = transactionData.attributes.totalCost;
      // emit socket to client
      mySocket.emit(transactionId, req.body);
    });
  });
  
});

console.log('Connectus is listening on port ' + port + '...');



