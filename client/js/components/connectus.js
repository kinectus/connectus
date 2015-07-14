var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var outletStore = require('../stores/outletStore');
var Auth = require('../services/authServices.js');
var Link = require('react-router').Link;

var Connectus = React.createClass({
  logout: function(){
    Auth.logout();
  },

  render: function() {
    //default view is the user NOT logged in
    var pageHtml = (
      <div className="main">
        <ul className="ui secondary pointing menu">
          <span className="logo">
            Connectus
          </span>
          <div className="right menu">
            <a className="ui item">
              <Link to="login">Login</Link>
            </a>
            <a className="ui item">
              <Link to="signup">Signup</Link>
            </a>
          </div>
        </ul>
        <div>
          <RouteHandler />
        </div>
      </div>
    );
  
    if(document.cookie){
      pageHtml = (
        <div className="main">
          <ul className="ui secondary pointing menu">
            <span className="logo">
              Connectus
            </span>
            <div className="right menu">
              <a className="item">
                <Link to="outletsList">Outlets</Link>
              </a>
              <a className="item">
                <Link to="about">About</Link>
              </a>
              <a className="item" onClick={this.logout}>
                Logout
              </a>
            </div>
          </ul>
          <div>
            <RouteHandler />
          </div>
        </div>  
      );
    }
    //final return statement

    return (
    <div>
      {pageHtml}
    </div>
    );
  }
});

module.exports = Connectus;