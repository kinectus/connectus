
var React = require('react');
var outletStore = require('../stores/outletStore');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var ReactAddons = require('react/addons');
var Link = require('react-router').Link;
var Router = require('react-router'); //need this for redirection
var FooterCheck = require('./footerCheck')


var seeReservedOutlet = React.createClass({

  componentDidMount: function() {
    FooterCheck.checker();
  },

  render: function() {
    return (<div>hi</div>)
  }
  
});

module.exports = seeReservedOutlet;