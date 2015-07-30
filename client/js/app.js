// var ConnectusDispatcher = require('./dispatcher/ConnectusDispatcher');
var React = require('react');
// var Connectus = require('./components/connectus');
var Router = require('react-router');
// var AuthenticatedApp = require('./components/authentication.js');
var LandingPage = require('./components/landingPage.js');
var AddOutlet = require('./components/addOutlet.js');
var RouterContainer = require('./services/RouterContainer.js');
var routes = require('./config/routes');

var router = Router.create({routes: routes});
RouterContainer.set(router);

router.run(function(Root){
  React.render(<Root />, document.getElementById('main'));
});