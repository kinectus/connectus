var React = require('react');
var outletStore = require('../stores/outletStore');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');

var Connectus = React.createClass({

  getInitialState: function(){
    console.log('initial state gotten by component')

    return {
      list: outletStore.getOutlets()
    }
  },

  showOutletInfo: function(id){
    ConnectusDispatcher.dispatch({
        action: 'CLICK_OUTLET',
        id: id
    });
  },

  outletInfoChange: function(){
    this.forceUpdate;
  },

  render: function() {
    var that = this;
    var outlets = outletStore.getOutlets();

    var outletHtml = outlets.map( function( outlet ) {
      return <li data-tag={outlet.id} onClick={that.showOutletInfo.bind(null, outlet.id)} key={ outlet.id }>
        { outlet.name } { outlet.color }
      </li>;
    });

    return <div>
      <ul>
          { outletHtml }
      </ul>
    </div>;
  }

});

module.exports = Connectus