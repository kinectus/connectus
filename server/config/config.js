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
// db.schema.raw('DROP SCHEMA IF EXISTS connectus; CREATE SCHEMA IF NOT EXISTS connectus; USE connectus');
var Bookshelf = require('bookshelf')(db);
// Add users table to db, store authentication
db.schema.hasTable('users').then(function(exists){
  // For design process ease, drop tables
  // if(exists){
  //   db.schema.dropTable('users');
  //   console.log('dropped')
  // }
  console.log(exists)
  if(!exists){
    db.schema.createTable('users', function(user){
      user.increments('id').primary();
      user.string('username', 20);
      // user.timestamps();
    }).then(function(table){
      console.log('Created users table', table);
    }); 
  }
});

db.schema.hasTable('outlets').then(function(exists){
  // For design process ease, drop tables
  // if(exists){
  //   db.schema.dropTable('outlets');
  //   console.log('dropped')
  // }
  if(!exists){
    db.schema.createTable('outlets', function(outlet){
      outlet.increments('id').primary();
      outlet.string('name', 30);
      // outlet.foreignkey('seller', )
      // outlet.timestamps();
    }).then(function(table){
      console.log('Created outlets table', table);
    }); 
  }
});

module.exports = Bookshelf;
