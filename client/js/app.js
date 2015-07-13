// var ConnectusDispatcher = require('./dispatcher/ConnectusDispatcher');
var React = require('react');
// var Connectus = require('./components/connectus');
var Router = require('react-router');
// var AuthenticatedApp = require('./components/authentication.js');
var Login = require('./components/login.js');
var Signup = require('./components/signup.js');
var LandingPage = require('./components/landingPage.js');
var RouterContainer = require('./services/RouterContainer.js');
var loginActions = require('./actions/loginActions.js');
var routes = require('./config/routes');

var router = Router.create({routes});
RouterContainer.set(router);

//logic for checking if user has been identified before routing them should go here

router.run(function(Root){
  React.render(<Root />, document.getElementById('main'));
});