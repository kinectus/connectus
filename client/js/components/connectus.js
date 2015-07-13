var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var outletStore = require('../stores/outletStore');

var Connectus = React.createClass({

  getInitialState: function(){
    console.log('initial state gotten by component');

    return {
      list: outletStore.getOutlets()
    };
  },

  render: function() {
    return (
      <div>
        <h1>ConnectUs!</h1>
        <div>
          <RouteHandler />
        </div>
      </div>
    )
  }
});

module.exports = Connectus;