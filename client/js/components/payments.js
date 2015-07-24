var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var ReactAddons = require('react/addons');
var PaymentStore = require('../stores/paymentStore');
var Auth = require('../services/authServices.js');
var Link = require('react-router').Link;
var mobile = require('./mobilecheck');

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
    return(
    <div className="paymentStats">
    <h3>You are being billed ${this.state.totalCost} for {this.state.totalEnergy} kWh of energy usage.</h3><br />
    <h3>Please submit your payment below.</h3>
    
    <form id="checkout" method="post" action="/payment/checkout">
      <div id="payment-form"></div>
      <input type="submit" value="Confirm Payment"/>
    </form>
    </div>
    
    );
  }

});

module.exports = Connectus;