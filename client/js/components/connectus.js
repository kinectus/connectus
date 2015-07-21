//this is the main React component that will be shown at all times
//Essentially, it is just the navigation bar, which renders conditionally based on whether or not a user is logged in

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var outletStore = require('../stores/outletStore');
var ReactAddons = require('react/addons');
var Auth = require('../services/authServices.js');
var Link = require('react-router').Link;
var mobile = require('./mobilecheck');

var Connectus = React.createClass({
  logout: function(){
    Auth.logout();
  },

  componentDidMount: function() {
    var that = this; 
    // for some reason, semantic needs this to make the menu to drop down
    $('.ui.dropdown').dropdown()

    // resizing the screen renders mobile or full menu
    var isMobile = mobile();
    window.onresize = function() {
        that.forceUpdate();
    };
  },

  render: function() {
    //default view is the user NOT logged in

    // check if the screen is mobile-y sized
    var isMobile = mobile();

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
    // secondary pointing
    if(document.cookie){

      if(isMobile){

        pageHtml = (
          <div className="main">
            <span className="logo">
              Connectus
            </span>
            <div className="ui right dropdown item">
              More
              <i className="dropdown icon"></i>
              <div className="menu">
                <div className="item">
                  <a>
                    <Link to="outletsList">Outlets</Link>
                  </a>
                </div>
                <div className="item">
                  <a>
                    <Link to="addOutlet">Add Outlet</Link>
                  </a>
                </div>
                <div className="item">
                  <a>
                    <Link to="buyerReservations">Buyer Reservations</Link>
                  </a>
                </div>
                <div className="item">
                  <a>
                    <Link to="about">About</Link>
                  </a>
                </div>
                <div className="item">
                  <a onClick={this.logout}>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          <div>
            <RouteHandler />
          </div>
        </div> 
      )

      // if NOT mobile, make it this... 
      } else {

        pageHtml = (
          <div className="main">
          <div className="ui secondary pointing menu">
              <span className="logo">
                Connectus
              </span>
                <a className="item">
                  <Link to="outletsList">Outlets</Link>
                </a>
                <a className="item">
                  <Link to="addOutlet">Add Outlet</Link>
                </a>
                <a className="item">
                  <Link to="buyerReservations">Buyer Reservations</Link>
                </a>
                <a className="item">
                  <Link to="about">About</Link>
                </a>
                <a className="logout" onClick={this.logout}>
                  Logout
                </a>
              </div>
            <div>
              <RouteHandler />
            </div>
          </div> 
          );
        } 
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