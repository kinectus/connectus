var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var outletStore = require('../stores/outletStore');
var ReactAddons = require('react/addons');
var PaymentStore = require('../stores/paymentStore');
var Auth = require('../services/authServices.js');
var Link = require('react-router').Link;
var mobile = require('./mobilecheck');

var Connectus = React.createClass({
  getInitialState: function(){
    return {
      amount: ''
    };
  },
  componentDidMount: function() {
    var that = this;
    PaymentStore.getTransactionInfo().then(function(transaction){
      console.log('transaction in payment confirmation', transaction);
      that.setState({amount:transaction.totalCost});
    });
 },

  render: function() {
    
    return(
    <div><h1>Your payment of ${this.state.amount} has been successfully received.</h1>
    <btn class="btn"><Link to="outletsList">
      Make Another Reservation
    </Link></btn>
    </div>
    );
  }
});

module.exports = Connectus;