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
      user.string('username', 20).notNullable();
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
      outlet.string('name', 30).notNullable();
      outlet.decimal('priceEnergy', 5, 2).notNullable();
      outlet.decimal('priceHourly', 5, 2).notNullable();
      outlet.decimal('lat', 7, 5).notNullable();
      outlet.decimal('long', 7 ,5).notNullable();
      outlet.string('description', 300).notNullable();
      outlet.decimal('priceSuggest', 5, 2).notNullable();
      // outlet.string('photo'); --store the path to a directory, not the photo (worstcase, longblob)
      outlet.string('address', 100).notNullable();
      outlet.integer('seller_id', 11).notNullable();
      outlet.integer('buyer_id', 11).notNullable();

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
      transaction.dateTime('start').notNullable();
      transaction.dateTime('end').notNullable();
      transaction.decimal('totalEnergy', 5, 2).notNullable(); //random precision choice
      transaction.decimal('totalCost', 6, 2).notNullable(); //random precision choice
      transaction.integer('buyer_id', 11).notNullable();
      transaction.integer('seller_id', 11).notNullable();
      transaction.integer('outlet_id', 11).notNullable();
    }).then(function(table){
      console.log('Created transactions table', table);
    });
  }
});

module.exports = Bookshelf;
