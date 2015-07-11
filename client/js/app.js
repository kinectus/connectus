var ConnectusDispatcher = require('./dispatcher/ConnectusDispatcher');
var React = require('react');
var Connectus = require('./components/connectus');
var Router = {Route} = require('react-router');
var AuthenticatedApp = require('./components/authentication.js');
var Login = require('./components/login.js');
var Signup = require('./components/signup.js');
var LandingPage = require('./components/landingPage.js');
var RouterContainer = require('./services/RouterContainer.js');
var loginActions = require('./actions/loginActions.js');

var routes = (
  <Route handler={AuthenticatedApp}>
    <Route name="login" handler={Login}>
    <Route name="signup" handler={Signup}>
    <Route name="landingPage" path="/" handler={LandingPage}>
  </Route>
);

var router = Router.create({routes});
RouterContainer.set(router);

var jwt = localStorage.getItem('jwt');
if(jwt){
  LoginActions.loginUser(jwt);
}

router.run(function(Handler){
  React.render(<Handler />, document.getElementbyId('main'));
})


// React.render(<Connectus />, document.getElementById('main'));