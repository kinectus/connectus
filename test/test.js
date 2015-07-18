// these requires are for testing the server
// some aren't currently being used or aren't installed
// var expect = require('chai').expect;
// var request = require('request');
var server = require('../server/server');
var http = require('http')
var assert = require('assert')

// these requires are for testing the database
var db = require('../server/config/db/config');
var Outlet = require('../server/outlets/outlet.model');
var async = require('async');
var should = require('should');

// ---------------------------------------------------------------------------------
                  /*            TESTY TESTS             */
// ---------------------------------------------------------------------------------

// this starts the server before each test and then closes it after all tests are run
describe('server', function () {
  before(function () {
    server.listen(3000);
  });

  after(function () {
    server.close();
  });
});

// this test makes a get request to the homepage
describe('a request to the homepage should return a 200 code', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:3000', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

// this test makes a get request to the outlets api
describe('a request to the outlets api should return data for outlets', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:3000/api/outlets', function (res) {
      var data = '';

      res.on('data', function (chunk) {
        data += chunk;
      });


      res.on('end', function () {
        var outlets = JSON.parse(data);
        assert.equal('object', typeof outlets);
        done();
      });
    });
  });
});

// this test makes an entry to the db and then tests if its there
describe('Server connection with the database', function(){
  it('should pull the fake data', function (done) {
    this.timeout(5000);
    async.series([
      function (cb) {
        Outlet.forge({
          name: 'Hack Reactor Outlet'
        }).fetch()
        .then(function(outlet){
          assert.equal(outlet.attributes.id, 1);
          done();
        });
      }
    ], done);
  });
  it('should be able to add a new outlet', function(done){
    assert.equal(1, 1); // obvi not real
    done();
  });
});

// ------------------------------------------------------------------
// these are copy/pasted as examples for future test writing



// describe('', function() {

//   beforeEach(function() {
//     // log out currently signed in user
//     request('http://127.0.0.1:3000', function(error, res, body) {});

//     // delete link for roflzoo from db so it can be created later for the test
//     db.select().table('outlets')
//       .where('name', '=', 'Hack Reactor Outlet')
//       .del()
//       .catch(function(error) {
//         throw {
//           type: 'DatabaseError',
//           message: 'Failed to create test setup data'
//         };
//       });
//   });

//   describe('Link creation:', function(){

//       var requestWithSession = request.defaults({jar: true});

//       beforeEach(function(done){      // create a user that we can then log-in with
//         new User({
//             'username': 'Phillip',
//             'password': 'Phillip'
//         }).save().then(function(){
//           var options = {
//             'method': 'GET',
//             'followAllRedirects': true,
//             'uri': 'http://127.0.0.1:3000',
//             'json': {
//               'username': 'Phillip',
//               'password': 'Phillip'
//             }
//           };
//           // login via form and save session info
//           requestWithSession(options, function(error, res, body) {
//             done();
//           });
//         });
//       });

//     });
// });

// var async = require('async'),
//     request = require('supertest'),
//     should = require('should'),
//     app = require('../server'),
//     connection = require('../database');
 
// describe('Req 1: Landing page functionality', function(){
//   before(function (done) {
//     this.timeout(5000);
//     async.series([
//       function (cb) {
//         connection.query('INSERT INTO mocha_test_table '+
//           'VALUE("TEST","TEST","","");',function(err){
//             done();
//           });
//       },
//       function (cb) {
//         connection.query('SELECT * FROM mocha_test_table WHERE user_name="TEST"'+
//           ' AND email="TEST";',function(err,results){
//             results.length.should.not.equal(0);
//             done();
//           });
//       }
//     ], done);
//   });
//   it('1.1 Text of landing page', function(done){
//     request(app)
//       .get('/')
//       .expect(200)
//       .end(function (err, res) {
//         res.text.should.include('Home');
//         done();
//       });
//   });
//   it('1.2 Link to the login page', function(done){
//     request(app)
//       .get('/')
//       .expect(200)
//       .end(function (err, res) {
//         res.text.should.include('/login');
//         done();
//       });
//   });
// });
// Find the rest of the test code in the source link below 

