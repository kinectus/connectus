var app = require('./server-config');
var port = process.env.PORT || 3000;


app.listen(3000);
console.log('Connectus is listening on port ' + port + '...');
