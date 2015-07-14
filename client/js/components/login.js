var React = require('react');
var ReactAddons = require('react/addons');
var ReactMixin = require('react-mixin');
var Auth = require('../services/authServices.js');

var Login = React.createClass({
  render: function(){
    return (
  	  <div className="login">
        <h1>Login</h1>
        <a href="localhost:3000/auth/facebook">
        </a>
      </div>
    );
  }

});

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);

module.exports = Login;