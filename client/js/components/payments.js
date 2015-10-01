var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var ReactAddons = require('react/addons');
var PaymentStore = require('../stores/paymentStore');
var Auth = require('../services/authServices.js');
var Link = require('react-router').Link;
var mobile = require('./mobilecheck');

// Handle user payment

var Connectus = React.createClass({
  getInitialState: function(){
    return {
      totalCost: '',
      totalEnergy: ''
    };
  },

  componentDidMount: function() {
    var that = this;
    PaymentStore.getTransactionInfo().then(function(transaction){
      that.setState({totalCost:transaction.totalCost, totalEnergy:transaction.totalEnergy});
    });

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
    var amount = Math.round(this.state.totalCost * 100) / 100;
    var energy = Math.round(this.state.totalEnergy * 100) / 100;
    return(
    <div className="container">
      <div className="paymentStats">
        <h3>You are being billed ${ amount } for { energy } kWh of energy usage.</h3>
        <h4 className="light">Please submit your payment below.</h4>
        <form id="checkout" method="post" action="/payment/checkout">
          <div id="payment-form"></div>
          <button input="submit" value="Confirm Payment" className="btn btn-default">Confirm Payment</button>
        </form>
      </div>
    </div>
    
    );
  }

});

module.exports = Connectus;
