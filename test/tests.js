var assert = chai.assert,  
    expect = chai.expect,
    should = chai.should(); // Note that should has to be executed


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

//     it('should work with expect', function() {
//       expect(foobar.sayHello()).to.equal('funky chicken!');
//     })

//     it('should work with should', function() {
//       foobar.sayHello().should.equal('funky chicken!');
//     })
//   })
// })


describe('Outlet Componenets', function(){
  describe('outletsList.render()', function(){
    it('should return something', function() {
      assert.equal(3,3);
    })
  })
})