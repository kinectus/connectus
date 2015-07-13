var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var Connectus = React.createClass({
  render: function(){
    return (
	    <div>
	      <h1>Connect us!</h1>
	      <div>
	        <RouteHandler />
	      </div>
	    </div>
    )
  }
});