var React = require('react');
var ReactAddons = require('react/addons');
var ReactMixin = require('react-mixin');
var Auth = require('../services/authServices.js');

var Login = React.createClass({
  getInitialState: function(){
    return {
      username: '',
      password: ''
    };
  },

  login: function(e){
    e.preventDefault();
    console.log('login was called');
    //TODO: Write calls in Auth services to send/check user and password
    Auth.login(this.state.user, this.state.password)
      .catch(function(err) {
        alert("There's an error logging in");
        console.log("Error logging in", err);
      });
  },

  render: function(){
    return (
  	  <div className="login">
        <h1>Login with Facebook</h1>
        <form role="form" className="ui large form">
	        <div className="six wide field">
	          <label htmlFor="username">Username</label>
	          <input type="text" valueLink={this.linkState('username')} className="form-control" id="username" placeholder="Username" />
	        </div>
	        <div className="six wide field">
	          <label htmlFor="password">Password</label>
	          <input type="password" valueLink={this.linkState('password')} className="form-control" id="password" ref="password" placeholder="Password" />
	        </div>
	        <button type="submit" className="ui large fluid button" onClick={this.login.bind(this)}>Submit</button>
        </form>
      </div>
    );
  }

});

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);

module.exports = Login;