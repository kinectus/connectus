var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var outletStore = require('../stores/outletStore');
var ReactAddons = require('react/addons');
var PaymentStore = require('../stores/paymentStore');
var Auth = require('../services/authServices.js');
var Link = require('react-router').Link;
var mobile = require('./mobilecheck');

var Connectus = React.createClass({
  componentDidMount: function() {
  var paymentStatus = true;
  // var pageHtml = paymentStatus ? "<h1>Your payment has been successfully received. <br /> Confirmation #: </h1>" : "<h1>Your payment was declined. Please try again</h1>";
 },

  render: function() {
    
    return(
    <div><h1>Your payment has been successfully received. <br /> Confirmation #: </h1>
    <btn class="btn"><Link to="outletsList">
      Make Another Reservation
    </Link></btn>
    </div>
    );
  }
});

module.exports = Connectus;