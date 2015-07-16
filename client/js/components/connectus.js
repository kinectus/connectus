//this is the main React component that will be shown at all times
//Essentially, it is just the navigation bar, which renders conditionally based on whether or not a user is logged in

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
            <a className="ui item loginlink">
              <Link to="login">Login</Link>
            </a>
          </div>
        </ul>
        <div>
          <RouteHandler />
        </div>
      </div>
    );

    //reset the html that will be shown if the user is logged in(cookie present)
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

    //actual rendering happens here - logic to decide what {pageHtml} is happens above
    return (
    <div>
      {pageHtml}
    </div>
    );
  }
});

module.exports = Connectus;