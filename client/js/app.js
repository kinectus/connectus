var React = require('react');
var Router = require('react-router');

var RouterContainer = require('./services/RouterContainer.js');
var routes = require('./config/routes');

var router = Router.create({routes: routes});
RouterContainer.set(router);

router.run(function(Root){
  React.render(<Root />, document.getElementById('main'));
});