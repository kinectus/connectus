var React = require('react');

var Login = React.createClass({
  render: function(){
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