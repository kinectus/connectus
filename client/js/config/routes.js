//client-side routing
var React = require('react');
var Connectus = require('../components/connectus.js');
var About = require('../components/about.js');
var OutletsList = require('../components/outletsList.js');
var OutletsListMap = require('../components/outletsListMap.js');
var BuyerReservations = require('../components/buyerReservations.js');
var ReserveOutlet = require('../components/reserveOutlet/reserveOutlet.js');
var AddOutlet = require('../components/addOutlet.js');
var EditOutlet = require('../components/editOutlet.js');
var ManageOutlets = require('../components/manageOutlets.js');
var PaymentsPage = require('../components/payments.js');
var PaymentConfirmation = require('../components/paymentConfirmation.js');
var Router = require('react-router'); //npm component for routing
var DefaultRoute = Router.DefaultRoute; 
var Route = Router.Route;

//connectus - always shown on the home page - holdes a <RouteHandler> that displays the other compnents
module.exports = (
  <Route name="connectus" path="/" handler={Connectus} > 
    <Route name="about" path="/about" handler={About} />
    <Route name="paymentsPage" path="/paymentsPage" handler={PaymentsPage} />
    <Route name="outletsList" path="/outlets" handler={OutletsList} />
    <Route name="outletsListMap" path="/outlets/map" handler={OutletsListMap} />
    <Route name="reserveOutlet" path="/outlets/:id" handler={ReserveOutlet} />
    <Route name="addOutlet" path="/addOutlet" handler={AddOutlet} />
    <Route name="editOutlet" path="/editOutlet/:id" handler={EditOutlet} />
    <Route name="manageOutlets" path="/manageOutlets" handler={ManageOutlets} />
    <Route name="paymentConfirmation" path="/paymentConfirmation" handler={PaymentConfirmation} />
    <Route name="buyerReservations" path="/buyerReservations" handler={BuyerReservations} />
    <DefaultRoute handler={About} /> 
  </Route>
);