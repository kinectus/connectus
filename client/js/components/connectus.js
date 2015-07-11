var React = require('react');
var outletStore = require('../stores/outletStore');

var Connectus = React.createClass({

  getInitialState: function(){
    console.log('initial state gotten by component')

    return {
      list: outletStore.getOutlets()
    }
  },

  moreOutletInfo: function(){
    console.log('in moreOutletInfo function in the component')
  },

  render: function() {
    return <h1>ConnectUs!</h1>
  }
});

module.exports = Connectus