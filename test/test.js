// these requires are for testing the server
var expect = require('chai').expect;
var request = require('request');
var server = require('../server/server');
var http = require('http')
var assert = require('assert')

// these requires are for testing the database
var db = require('../server/config/db/config');
var Outlets = require('../server/outlets/outlets.collection');

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

// this test makes a get request to the homepage
describe('a request to the outlets api should return data for outlets', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:3000/api/outlets', function (res) {var data = '';

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


// these are copy/pasted but maybe can be modified to test our database
describe('', function() {

  beforeEach(function() {
    // log out currently signed in user
    request('http://127.0.0.1:3000', function(error, res, body) {});

    // delete link for roflzoo from db so it can be created later for the test
    db.select().table('outlets')
      .where('name', '=', 'Hack Reactor Outlet')
      .del()
      .catch(function(error) {
        throw {
          type: 'DatabaseError',
          message: 'Failed to create test setup data'
        };
      });
  });

  describe('Link creation:', function(){

      var requestWithSession = request.defaults({jar: true});

      beforeEach(function(done){      // create a user that we can then log-in with
        new User({
            'username': 'Phillip',
            'password': 'Phillip'
        }).save().then(function(){
          var options = {
            'method': 'GET',
            'followAllRedirects': true,
            'uri': 'http://127.0.0.1:3000',
            'json': {
              'username': 'Phillip',
              'password': 'Phillip'
            }
          };
          // login via form and save session info
          requestWithSession(options, function(error, res, body) {
            done();
          });
        });
      });

    });
});

