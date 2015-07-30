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
    this.footerCheck()

    // resizing the screen renders mobile or full menu
    var that = this; 
    var isMobile = mobile();
    window.onresize = function() {
      that.footerCheck();
      that.forceUpdate();
    };
  },

  footerCheck: function() {
    if ( ( $('body').height() ) < window.innerHeight ) {
      console.log('body height is less than window inner height')
      $('.footer-banner').css('top', (window.innerHeight));
    } else {
      console.log('body height is greater than window inner height')
      $('.footer-banner').css('top', ($('body').height()));
    }
  },

  render: function() {
    //default view is the user NOT logged in

    // check if the screen is mobile-y sized
    var isMobile = mobile();

    var routeHandler = (
      <div>
        <RouteHandler />
      </div>
    )

    // var pageHtml = (
    //   <div className="topNavBar">
    //     <span className="logo">
    //       <Link to="about">Connect.us</Link>
    //     </span>
    //     <ul className="nav nav-pills pull-right">
    //       <li role="presentation">
    //         <Link to="login">Login</Link>
    //       </li>
    //       <li role="presentation">
    //         <Link to="signup">Sign Up</Link>
    //       </li>
    //     </ul>
    //   </div>
    // );

    //moving login/signup to splash page
    var pageHtml = (
      <div className="topNavBar">
        <span className="logo">
          <Link to="about">Connect.us</Link>
        </span>
      </div>
    );

    if(isMobile){
      console.log('mobile footer rendering')
      var footerHtml = (
        <div className="container-fluid footer-banner">
            <div className='footer-1'>
              <h3>Connect.us Team</h3>
              <h4>Sean Connor, Valerie Liang,</h4>
              <h4>Dianna Faulk, Jammie Mountz</h4>
            </div>
            <a href="https://github.com/kinectus/connectus"><div className='footer-2 octocat'></div></a>
        </div>
      );
    } else {
      console.log('full footer rendering')
      var footerHtml = (
        <div className="container-fluid footer-banner">
          <div className='row footer'>
            <div className='col-md-4'>
              <h3>Connect.us Team</h3>
              <h4>Sean Conner, Valerie Liang,</h4>
              <h4>Dianna Faulk, Jammie Mountz</h4>
            </div>
            <a href="https://github.com/kinectus/connectus"><div className='col-md-4 octocat'></div></a>
            <div className='col-md-4'></div>
          </div>
        </div>
      );
    }

    //reset the html that will be shown if the user is logged in(cookie present)
    // secondary pointing

    if(document.cookie){

      if(isMobile){
        console.log('mobile')

        pageHtml = (
          <div className="topNavBar">
            <div className="mobile">
              <span className="logo">
                <Link to="about">Connect.us</Link>
              </span>
            </div>
            <div className="mobile">
              <ul className="nav navbar-nav">
                <li className="dropdown">
                  <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Menu<span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li role="presentation"><Link to="outletsList">Outlets</Link></li>
                    <li role="presentation"><Link to="addOutlet">Add Outlet</Link></li>
                    <li role="presentation"><Link to="buyerReservations">My Reservations</Link></li>
                    <li role="presentation"><Link to="manageOutlets">Manage Outlets</Link></li>
                    <li role="separator" className="divider"></li>
                    <li role="presentation"><a className="logout" onClick={this.logout}>Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div> 
      )

      // if NOT mobile, make it this... 
      } else {

        pageHtml = (
          <div className="topNavBar">
          <span className="logo">
            <Link to="about">Connect.us</Link>
          </span>
            <ul className="nav nav-pills pull-right">
              <li role="presentation"><Link to="outletsList">Outlets</Link></li>
              <li role="presentation"><Link to="addOutlet">Add Outlet</Link></li>
              <li role="presentation"><Link to="buyerReservations">My Reservations</Link></li>
              <li role="presentation"><Link to="manageOutlets">Manage Outlets</Link></li>
              <li role="presentation"><a className="logout" onClick={this.logout}>Logout</a></li>
            </ul>
          </div> 
          );
      } 
    }

    //actual rendering happens here - logic to decide what {pageHtml} is happens above
    return (
    <div className="container-fluid">
      {pageHtml}
      {routeHandler}
      {footerHtml}
    </div>
    );
  }
});

module.exports = Connectus;