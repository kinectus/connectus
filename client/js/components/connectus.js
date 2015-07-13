var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var outletStore = require('../stores/outletStore');

var Connectus = React.createClass({
  render: function() {
    return (
      <div className="ui container">
        <div className="ui menu">
          <h1>ConnectUs!</h1>
        </div>
        <div>
          <RouteHandler />
        </div>
      </div>
    )
  }
});

module.exports = Connectus;