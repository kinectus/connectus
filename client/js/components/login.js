var React = require('react');
var Link = require('react-router').Link;
var AuthConstants = require('../constants/authConstants.js');
// var ReactAddons = require('react/addons');


var Login = React.createClass({
  render: function(){
    //comments here because cannot be kept in markup:
    //user clicks on Facebook login to go to facebook auth
    //on successful auth, users are redirected to outlets page
    return (
  	  <div className="login centered ui container">
        <h3>Login</h3>
        <a href={AuthConstants.FACEBOOK}>
          <div className="btn">Connect with Facebook</div>
        </a>
        
        <p><Link to="signup">Sign up instead</Link></p>
      </div>
    );
  }

});

module.exports = Login;