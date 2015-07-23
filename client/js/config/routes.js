//client-side routing
var React = require('react');
var Connectus = require('../components/connectus.js');
var Signup = require('../components/signup.js');
var Login = require('../components/login.js');
var LandingPage = require('../components/landingPage.js');
var About = require('../components/about.js');
var OutletsList = require('../components/outletsList.js');
var OutletsListMap = require('../components/outletsListMap.js');
var buyerReservations = require('../components/buyerReservations.js');
var ReserveOutlet = require('../components/reserveOutlet.js');
var AddOutlet = require('../components/addOutlet.js');
var SellerOutlets = require('../components/sellerOutlets.js');
var PaymentsPage = require('../components/payments.js');
var seeReservedOutlet = require('../components/seeReservedOutlet.js');
var PaymentConfirmation = require('../components/paymentConfirmation.js');
var Router = require('react-router'); //npm component for routing
var DefaultRoute = Router.DefaultRoute; 
var Route = Router.Route;

// <Route name="seeReservedOutlet" path="/seeReservedOutlet/:transId" handler={seeReservedOutlet} />

//connectus - always shown on the home page - holdes a <RouteHandler> that displays the other compnents
module.exports = (
  <Route name="connectus" path="/" handler={Connectus} > 
    <Route name="login" path="/login" handler={Login} />
    <Route name="signup" path="/signup" handler={Signup} />
    <Route name="about" path="/about" handler={About} />
    <Route name="landingPage" path="/landingPage" handler={LandingPage} />
    <Route name="paymentsPage" path="/paymentsPage" handler={PaymentsPage} />
    <Route name="outletsList" path="/outlets" handler={OutletsList} />
    <Route name="outletsListMap" path="/outlets/map" handler={OutletsListMap} />
    <Route name="reserveOutlet" path="/outlets/:id" handler={ReserveOutlet} />
    <Route name="addOutlet" path="/addOutlet" handler={AddOutlet} />
    <Route name="paymentConfirmation" path="/paymentConfirmation" handler={PaymentConfirmation} />
    <Route name="buyerReservations" path="/buyerReservations" handler={buyerReservations} />
    <Route name="sellerOutlets" path="/sellerOutlets" handler={SellerOutlets} />
    <DefaultRoute handler={About} /> 
  </Route>
);