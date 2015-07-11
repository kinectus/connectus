var path = require('path');
var Promise = require('bluebird');

// Initialize database
var db = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: '',
    user: 'root',
    password: '',
    database: 'connectus',
    charset: 'utf8'
    // filename: path.join(__dirname, './kinectus/kinectus.mysql/')
  }
});
// 
var Bookshelf = require('bookshelf')(db);
// Add users table to db, store authentication
db.schema.hasTable('users').then(function(exists){
  console.log("INSIDE")
  console.log(exists);
  if(!exists){
    db.schema.createTable('users', function(user){
      user.increments('id').primary();
      user.string('username', 20);
      user.timestamps();
    }).then(function(table){
      console.log('Created users table', table);
    }); 
  }
});

module.exports = db;
