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
      outlet.decimal('priceEnergy', 5, 2);
      outlet.decimal('priceHourly', 5, 2);
      outlet.decimal('lat', 7, 5);
      outlet.decimal('long', 7 ,5);
      outlet.string('description', 300);
      outlet.decimal('priceSuggest', 5, 2);
      // outlet.string('photo'); --store the path to a directory, not the photo (worstcase, longblob)
      outlet.string('address', 100);
      // seller join
      // buyer join
    }).then(function(table){
      console.log('Created outlets table', table);
    }); 
  }
});

db.schema.hasTable('transactions').then(function(exists){
  // For design process ease, drop tables
  // if(exists){
  //   db.schema.dropTable('transactions');
  //   console.log('dropped')
  // }
  if(!exists){
    db.schema.createTable('transactions', function(transaction){
      transaction.increments('id').primary();
      // outlet join
      // seller join
      // buyer join
      transaction.dateTime('start');
      transaction.dateTime('end');
      transaction.decimal('totalEnergy', 5, 2); //random precision choice
      transaction.decimal('totalCost', 6, 2); //random precision choice
    }).then(function(table){
      console.log('Created transactions table', table);
    });
  }
});

module.exports = Bookshelf;
