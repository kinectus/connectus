// var ConnectusDispatcher = require('./dispatcher/ConnectusDispatcher');
var React = require('react');
// var Connectus = require('./components/connectus');
var Router = require('react-router');
// var AuthenticatedApp = require('./components/authentication.js');
var Login = require('./components/login.js');
var Signup = require('./components/signup.js');
var LandingPage = require('./components/landingPage.js');
// var RouterContainer = require('./services/RouterContainer.js');
var loginActions = require('./actions/loginActions.js');
var routes = require('./config/routes');

Router.run(routes, function(Root){
  React.render(<Root />, document.getElementById('main'));
});