var React = require('react');
var Auth = require('../services/authServices.js');
var AuthConstants = require('../constants/authConstants.js');
// var ReactAddons = require('react/addons');

var Signup = React.createClass({

  render: function(){
    //comments here because cannot be kept in markup:
    //user clicks on Facebook login to go to facebook auth
    //on successful auth, users are redirected to outlets page
    return (
  	  <div className="login ui center container">
        <h3>Signup with Facebook</h3>
        <a href={AuthConstants.BASE_URL+'/auth/facebook'}>
          <img src="../assets/img/connect.png" />
        </a>
      </div>
    );
  }
  
});

module.exports = Signup;