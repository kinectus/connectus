var Bookshelf = require('bookshelf');
var path = require('path');

// Initialize database
var db = Bookshelf.initialize({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'connectus',
    charset: 'utf8',
    // filename: path.join(__dirname, './kinectus/')
  }
});
