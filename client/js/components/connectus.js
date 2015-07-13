var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var outletStore = require('../stores/outletStore');

var Connectus = React.createClass({

  getInitialState: function(){
    console.log('state gotten by component')

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

  componentDidMount: function() {
      outletStore.addChangeListener(this._onChange);
  },

  render: function() {
<<<<<<< HEAD
    return (
      <div>
        <h1>ConnectUs!</h1>
        <div>
          <RouteHandler />
        </div>
      </div>
    )
  //   var that = this;
  //   var outlets = outletStore.getOutlets();

  //   var outletHtml = outlets.map( function( outlet ) {
  //     return <li data-tag={outlet.id} onClick={that.showOutletInfo.bind(null, outlet.id)} key={ outlet.id }>
  //       { outlet.name } { outlet.color }
  //     </li>;
  //   });

  //   return <div>
  //     <ul>
  //         { outletHtml }
  //     </ul>
  //   </div>;
  // },

  _onChange: function() {
    this.setState(this.getInitialState());
  }
});

module.exports = Connectus;