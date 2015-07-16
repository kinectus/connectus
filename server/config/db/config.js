var path = require('path');
var Promise = require('bluebird');
var outletExamples = require('./outletDataExamples')

// Initialize database
var db = require('knex')({
  client: 'mysql',
  connection: process.env.CLEARDB_DATABASE_URL || {
    host: '127.0.0.1',//mysql://bd88d20b6f0b67:7e80e308@
    // port: '',
    user: 'root',
    // password: '',
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
      user.string('username', 50).notNullable();
      user.string('fullname', 50);
      user.string('email', 100);
      user.string('profileUrl', 500);
      user.string('profileImage', 500);
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
      outlet.float('lat').notNullable();
      outlet.float('long').notNullable();
      outlet.string('description', 300).notNullable();
      outlet.decimal('priceSuggest', 5, 2).notNullable();
      // outlet.string('photo'); --store the path to a directory, not the photo (worstcase, longblob)
      outlet.string('address', 100).notNullable();
      // outlet.integer('seller_id', 11).unsigned().references('users.id').notNullable();
      // outlet.integer('buyer_id', 11).unsigned().references('users.id').notNullable();

      // seller join
      // buyer join
    }).then(function(table){
      console.log('Created outlets table', table);
      insertInfoInTable('outlets', null)
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
      transaction.integer('buyer_id', 11).unsigned().references('users.id').notNullable();
      transaction.integer('seller_id', 11).unsigned().references('users.id').notNullable();
      transaction.integer('outlet_id', 11).unsigned().references('outlets.id').notNullable();
    }).then(function(table){
      console.log('Created transactions table', table);
    });
  }
});

var tableDataContainsInfo = function(tableData, field, value) {
  for (var i = 0; i < tableData.length; i++) {
    //check for value in field
    if (tableData[i][field] === value) {
      return true;
    }
  }
  return false;
};

var insertInfoInTable = function(tableName, callback) {
  var tableInfo = outletExamples;
  console.log('======================================== INSERTING YO FAKE DATA', outletExamples)
  // if (tableName === 'users') {
  //   tableInfo = sampleUsers;
  // } else if (tableName === 'events') {
  //   tableInfo = sampleEvents;
  // }

  db.select().table(tableName).then(function(results) {
    var fieldToCheck = 'name';
    if (!tableDataContainsInfo(results, fieldToCheck, tableInfo[0][fieldToCheck])) {
      console.log('inserting sample info in table');
      db(tableName).insert(tableInfo).then(function(insert) {
        db.select().table(tableName).then(function(results) {
          if (callback) {
            callback(results);
          }
        })
        .catch(function(error) {
          console.log("error1", error);
        });
      })
      .catch(function(error) {
        console.log("error2", error);
      });
    }
  })
  .catch(function(error) {
    console.log("error3", error);
  });
};

module.exports = Bookshelf;
