var React = require('react');


var Login = React.createClass({
  render: function(){
    //comments here because cannot be kept in markup:
    //user clicks on Facebook login to go to facebook auth
    //on successful auth, users are redirected to outlets page
    return (
  	  <div className="login centered ui">
        <h1>Login</h1>
        <a href="http://localhost:3000/auth/facebook">
          <img src="../assets/img/connect.png" />
        </a>
      </div>
    );
  }

});

module.exports = Login;