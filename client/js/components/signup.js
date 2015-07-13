var React = require('react');
var ReactAddons = require('react/addons');
var ReactMixin = require('react-mixin');
// var Auth = require('../services/AuthService');

var Signup = React.createClass({
  getInitialState: function(){
    return {
      username: '',
      password: ''
    };
  },

  signup: function(e){
    e.preventDefault();
    //TODO: make Auth service call
    // Auth.signup(this.state.user, this.state.password, this.state.extra)
    //   .catch(function(err) {
    //     alert("There's an error logging in");
    //     console.log("Error logging in", err);
    //   });
    console.log('signup was called');
  },
  //comments for render - can't get comments to not show up in JSX markup
    //role helps screen readers to know that this is a form
    //htmlFor is the attribute of the label
    //linkState saves the value of the form to the state automatically (i.e. this.state.password === value of the form field with the valueLink of 'password')    
    //need to implement the signup factory for "onClick" to work

  render: function(){
    return (
  	  <div className="signup">
        <h1>Signup</h1>
        <form role="form" className="ui form">
	        <div className="field">
	          <label htmlFor="username">Username</label>
	          <input type="text" valueLink={this.linkState('username')} className="form-control" id="username" placeholder="Username" />
	        </div>
	        <div className="field">
	          <label htmlFor="password">Password</label>
	          <input type="password" valueLink={this.linkState('password')} className="form-control" id="password" ref="password" placeholder="Password" />
	        </div>
	        <button type="submit" className="ui button" onClick={this.signup.bind(this)}>Submit</button>
        </form>
      </div>
    );
  }

});

ReactMixin(Signup.prototype, React.addons.LinkedStateMixin);

module.exports = Signup;