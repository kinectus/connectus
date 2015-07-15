//client-side routing
var React = require('react');
var Connectus = require('../components/connectus.js');
var Signup = require('../components/signup.js');
var Login = require('../components/login.js');
var LandingPage = require('../components/landingPage.js');
var About = require('../components/about.js');
var OutletsList = require('../components/outletsList.js');
var ReserveOutlet = require('../components/reserveOutlet.js');
var Router = require('react-router'); //npm component for routing
var DefaultRoute = Router.DefaultRoute; 
var Route = Router.Route;

//connectus - always shown on the home page - holdes a <RouteHandler> that displays the other compnents
module.exports = (
  <Route name="connectus" path="/" handler={Connectus} > 
    <Route name="login" path="/login" handler={Login} />
    <Route name="signup" path="/signup" handler={Signup} />
    <Route name="about" path="/about" handler={About} />
    <Route name="landingPage" path="/landingPage" handler={LandingPage} />
    <Route name="outletsList" path="/outlets" handler={OutletsList} />
    <Route name="reserveOutlet" path="/outlets/:id" handler={ReserveOutlet} />
    <DefaultRoute handler={About} /> 
  </Route>
);