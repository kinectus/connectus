var React = require('react');
var ReactAddons = require('react/addons');
var ReactMixin = require('react-mixin');
// var Auth = require('../services/AuthService');

var LandingPage = React.createClass({

  render: function(){
    var pageHtml = (<h1>you are not authorized to see this page. Please sign in</h1>);
    if(document.cookie){
      pageHtml = (<h1>LANDING PAGE</h1>);
    }
    return (
      <div>
  	    {pageHtml}
      </div>
    );
  }

});

module.exports = LandingPage;