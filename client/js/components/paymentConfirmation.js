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
    
    return(
    <div><h1>Your payment of ${this.state.amount} has been successfully received.</h1><br />
    <h3>Please retain this confirmation for your records: #{this.state.confirmation}</h3>
    <btn class="btn"><Link to="outletsList">
      Make Another Reservation
    </Link></btn>
    </div>
    );
  }
});

module.exports = Connectus;