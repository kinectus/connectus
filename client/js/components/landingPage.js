var React = require('react');
var ReactAddons = require('react/addons');
var ReactMixin = require('react-mixin');
var Outlet = require('../services/outletServices');
var Router = require('react-router');
// var Auth = require('../services/AuthService');

var LandingPage = React.createClass({
  mixins: [Router.Navigation],
  // turnOn: function(){
  //   Outlet.turnOn();
  // },

  // turnOff: function(){
  //   Outlet.turnOff();
  // },

  render: function(){
    if(!document.cookie){
      this.transitionTo('login');
      return <h1></h1>;
    }

    return (
      <div className="landingPage">
          <h1>LANDING PAGE</h1>
          <button onClick={this.turnOn}>On</button>
          <button onClick={this.turnOff}>Off</button>
      </div>
    );
  }
});

module.exports = LandingPage;
