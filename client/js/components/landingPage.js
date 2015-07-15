var React = require('react');
var ReactAddons = require('react/addons');
var ReactMixin = require('react-mixin');
var Outlet = require('../services/outletServices');

var LandingPage = React.createClass({
  // turnOn: function(){
  //   Outlet.turnOn();
  // },

  // turnOff: function(){
  //   Outlet.turnOff();
  // },

  render: function(){
    var pageHtml = (
      <h1>you are not authorized to see this page. Please sign in</h1>
    );
    if(document.cookie){
      pageHtml = (
        <div>
          <h1>LANDING PAGE</h1>
          <button onClick={this.turnOn}>On</button>
          <button onClick={this.turnOff}>Off</button>
        </div>
      );
    }
    return(
      <div>
  	    {pageHtml}
      </div>
    );
  }
});

module.exports = LandingPage;
