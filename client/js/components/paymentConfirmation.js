var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var outletStore = require('../stores/outletStore');
var ReactAddons = require('react/addons');
var PaymentStore = require('../stores/paymentStore');
var OutletStore = require('../stores/outletStore');
var Auth = require('../services/authServices.js');
var Link = require('react-router').Link;
var mobile = require('./mobilecheck');
var FooterCheck = require('./footerCheck')

// Acknowledge user payment

var Connectus = React.createClass({
  getInitialState: function(){
    return {
      amount: '',
      confirmation: ''
    };
  },

  componentDidMount: function() {
    var that = this;

    FooterCheck.checker();
   
    PaymentStore.getTransactionInfo().then(function(transaction){
      console.log('transaction in payment confirmation', transaction);
      that.setState({amount:transaction.totalCost, confirmation: transaction.confirmation});
      return transaction;
    })
    .then(function(transaction){
      return OutletStore.setCurrentTransaction({id:transaction.id, currentStatus: false, paid: true})
      .then(function(transaction){
        console.log('transaction changed to false');
      });
    });
 },

  render: function() {

    var amount = Math.round(this.state.amount * 100) / 100;
    
    return(
    <div className="container payment-confirmation">
      <h1>Your payment of ${amount} has been successfully received.</h1>
      <h4 className="light">Please retain this confirmation for your records: #{this.state.confirmation}</h4>
      <button className="btn btn-default">
        <Link to="outletsList">
          Make Another Reservation
        </Link>
      </button>
    </div>
    );
  }
});

module.exports = Connectus;
