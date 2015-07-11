var React = require('react');
var ReactAddons = require('react/addons');
var ReactMixin = require('react-mixin');
var Auth = require('../services/AuthService');

var Login = React.createClass({
  getInitialState: function(){
    return {
      username:'',
      password: ''
    };
  },

  login: function(e){
    e.preventDefault();
    Auth.login(this.state.user, this.state.password)
      .catch(function(err){
        alert('There\'s an error logging in');
        console.log('error logging in');
      });
  },

  render: function(){
    return (
  	  <div className="login jumbotron center-block">
  	    <h1>Login</h1>
  	    <form role="form">
	  	    <div className="form-group">
	  	      <label htmlFor="username">Username</label>
	  	      <input type="text" valueLink={this.linkState('user')} className="form-control" id="username" placeholder="Username" />
	  	    </div>
	  	    <div className="form-group">
	  	      <label htmlFor="password">Password</label>
	  	      <input type="password" valueLink={this.linkState('password')} className="form-control" id="password" ref="password" placeholder="Password" />
	  	    </div>
	  	    <button type="submit" className="btn btn-default" onClick={this.login.bind(this)}>Submit</button>
    	  </form>
    	</div>
    );
  }

});
//this part might not work - did not set the prototype explicitly
ReactMixin(Login.prototype, ReactAddons.addons.LinkedStateMixin);

module.exports = Login;