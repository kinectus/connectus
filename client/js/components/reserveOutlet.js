var React = require('react');
var outletStore = require('../stores/outletStore');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');

var reserveOutlet = React.createClass({

  render: function() {
    console.log(this.props.params);
    var outletID = this.props.params.id
    return <div className="ui container">
      <h2>outlets</h2>
    </div>
  }

});

module.exports = reserveOutlet;