var React = require('react');
var Connectus = require('../components/connectus.js');
var Signup = require('../components/signup.js');
var Login = require('../components/login.js');
var LandingPage = require('../components/landingPage.js');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

module.exports = (
  <Route name="connectus" path="/" handler={Connectus} >
    <Route name="login" path="/login" handler={Login} />
    <Route name="signup" path="/signup" handler={Signup} />
    <Route name="landingPage" path="/landingPage" handler={LandingPage} />
    <DefaultRoute handler={Signup} />
  </Route>
);