var assert = chai.assert,  
    expect = chai.expect,
    should = chai.should(); // Note that should has to be executed

jest.dontMock('../js/app.js');

describe('the whole freakin app', function() {
  it('kind of does an appish thing', function() {
    var React = require('react/addons');
    var app = require('../js/app.js');
    var TestUtils = React.addons.TestUtils;

    // Render a checkbox with label in the document
    var app = TestUtils.renderIntoDocument(
    );

    // Verify that it's Off by default
    var label = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'label');
    expect(label.getDOMNode().textContent).toEqual('Off');

    // Simulate a click and verify that it is now On
    var input = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input');
    TestUtils.Simulate.change(input);
    expect(label.getDOMNode().textContent).toEqual('On');
  });
});



// <CheckboxWithLabel labelOn="On" labelOff="Off" />


// HERE'S AN EXAMPLE OF TESTING THE 'foobar' FUNCTION
// SHOWS THE SYNTAX FOR USING ASSERT, EQUAL, AND EXPECT

// var foobar = {  
//   sayHello: function() {
//     return 'funky chicken!';
//   }
// };

// describe('Foobar', function() {  
//   describe('#sayHello()', function() {
//     it('should work with assert', function() {
//       assert.equal(foobar.sayHello(), 'funky chicken!');
//     })

//     it('should work with expect', () {
//       expect(foobar.sayHello()).to.equal('funky chicken!');
//     })

//     it('should work with should', function() {
//       foobar.sayHello().should.equal('funky chicken!');
//     })
//   })
// })


// describe('Outlet Store', function(){
//   describe('outletStore.getOutlets()', function(){
//     it('should retrieve the fake data from the database', function(done) {
//       outletStore.getOutlets().then(function(outlets){
//         assert.equal(outlets.length, 4);
//       });
//       done();
//     })
//   })
// })