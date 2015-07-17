var expect = require('chai').expect;
var request = require('request');

var db = require('../server/config/db/config');
var Outlets = require('../server/outlets/outlets.collection');
// var User = require('../app/models/user');
// var Links = require('../app/collections/links');
// var Link = require('../app/models/link');

/************************************************************/
// Mocha doesn't have a way to designate pending before blocks.
// Mimic the behavior of xit and xdescribe with xbeforeEach.
// Remove the 'x' from beforeEach block when working on
// authentication tests.
/************************************************************/
// var xbeforeEach = function(){};
/************************************************************/


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

