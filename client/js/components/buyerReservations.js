
var React = require('react');
var outletStore = require('../stores/outletStore');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var ReactAddons = require('react/addons');
var Link = require('react-router').Link;
var Router = require('react-router'); //need this for redirection
var outletServices = require('../services/outletServices.js')


var buyerReservations = React.createClass({

  getInitialState: function(){
    return {
      data: []
    };
  },

  mixins: [Router.Navigation], //makes the router navigation information available for use (need this for redirection)

  // reserveOutlet: function(id){
  //   ConnectusDispatcher.dispatch({
  //       action: 'CLICK_OUTLET',
  //       id: id
  //   });
  // },

  componentDidMount: function() {
    var that = this;
    outletStore.getBuyerReservations().then(function(transactionsData){
      that.setState({data: transactionsData});
    });
  },

  // createTransaction: function(){
  //   outletStore.createTransaction().then(function(transaction){
  //     return transaction;
  //   });
  // },

  handleSubmit: function(id) {
    console.log('handleSumbit in the buyer reservations passing something: ', id)
    outletServices.turnOutletOn(id)
  },

  render: function() {

    // is the user authenticated?
    if(!document.cookie){
      this.transitionTo('login');
      return <h1></h1>;
    }

    var that = this;

    if (this.state.data.length !==0) {
      var transactionHtml = this.state.data.map(function(transaction) {
        return (
          <tr key={ transaction.id } onClick={ that.reserveOutlet }>
            <td>
              Start: { transaction.startTime.date} - { transaction.startTime.slot.time }
              <br />
              End: { transaction.endTime.date } - { transaction.endTime.slot.time } 
            </td>
            <td>
              { transaction.outlet.name } 
            </td>
            <td>
              Seller: { transaction.seller.fullname }
            </td>
            <td>
              { transaction.outlet.voltage }
            </td>
            <td>
              Price by hour: { transaction.outlet.priceHourly }
              <br />
              Price by kWh: { transaction.outlet.priceEnergy }
            </td>
            <td>
            { transaction.outlet.description }
            </td>
            <td>
              <div className="btn" onClick={that.handleSubmit.bind(that, transaction.outlet.id)}>Turn on</div>
              <div className="btn" onClick={that.createTransaction}>End</div>
            </td>
            
          </tr>
        )
      });
    }

      return (
        <div className="outletsList container">
          <table className="ui selectable celled padded table">
            <thead>
              <tr>
              <th>Reservation Info</th>
              <th className="">Outlet Name</th>
              <th>Seller</th>
              <th>Voltage</th>
              <th>Price</th>
              <th>Description</th>
              <th>Controller</th>
            </tr></thead>
            <tbody>
              { transactionHtml }
            </tbody>
          </table>
        </div>
      )
    // });  from the promise closing
  },

  _onChange: function() {
    this.setState(this.getInitialState());
  }

});

// <Link to="seeReservedOutlet" params={{id: transaction.outlet.id }}>
//  </Link>

module.exports = buyerReservations;
