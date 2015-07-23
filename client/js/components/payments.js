var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var ReactAddons = require('react/addons');
var PaymentStore = require('../stores/paymentStore');
var Auth = require('../services/authServices.js');
var Link = require('react-router').Link;
var mobile = require('./mobilecheck');

var Connectus = React.createClass({

  handleSubmit: function(paymentInfo){
    // PaymentStore.sendPayment(paymentInfo);
  },

  componentDidMount: function() {
    var that = this;
    //get the client token from the view and set it into local storage or set it as the variable here
    PaymentStore.getClientToken().then(function(clientToken){
      console.log(clientToken);
      braintree.setup(clientToken, "dropin", {
        container: "payment-form"
      });
    });
 },

  render: function() {
    var that = this;
    return(
    // <form id="checkout" onclick={that.handleSubmit()}>
    <form id="checkout" method="post" action="/api/checkout">
      <div id="payment-form"></div>
      <input type="submit" value="Confirm Payment" />
    </form>
    );
  }
});

module.exports = Connectus;