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
      console.log(transactionsData)
      that.setState({data: transactionsData});
    });
  },

  setCurrentTransaction: function(transactionId){
    var that =this;
    outletStore.setCurrentTransaction({id: transactionId, currentStatus: true, paid: false}).then(function(transaction){
      outletServices.turnOutletOff(id);
      that.transitionTo('paymentsPage');
      return transaction;
    });
  },

  turnOn: function(id) {
    outletServices.turnOutletOn(id);
  },

  // turnOff: function(id) {
  //   outletServices.turnOutletOff(id);
  // },

  render: function() {
    // is the user authenticated?
    if(!document.cookie){
      this.transitionTo('login');
      return <h1></h1>;
    }

    var that = this;

    if (this.state.data.length !==0) {
      var transactionRows = this.state.data.map(function(transaction) {
        return (
          <table className='table-hover transaction-rows'>
            <tr key={ transaction.id } onClick={ that.reserveOutlet } className='regTransRow'>
              <td className='regTrans'>
                Start: { transaction.startTime.date} - { transaction.startTime.slot.time }
                <br />
                End: { transaction.endTime.date } - { transaction.endTime.slot.time } 
              </td>
              <td className='regTrans'>
                { transaction.outlet.name } 
              </td>
              <td className='regTrans'>
                Seller: { transaction.seller.fullname }
              </td>
              <td className='regTrans'>
                { transaction.outlet.voltage }
              </td>
              <td className='regTrans'>
                Price by hour: { transaction.outlet.priceHourly }
                <br />
                Price by kWh: { transaction.outlet.priceEnergy }
              </td>
              <td className='regTrans'>
              { transaction.outlet.description }
              </td>
              <td className='regTrans'>
                <div className="btn" onClick={that.turnOn.bind(that, transaction.outlet.id)}>ON</div>
                <div className="btn" onClick={that.turnOff.bind(that, transaction.outlet.id)}>OFF</div>
              </td>
            </tr>
            <ActiveTransaction />
          </table>
        )
      });
    }

    // for active transactions ------
    // is there active transactions for this user?
      // set active transactions html element to that data

      return (
        <div className="outletsList container">
          <table className="ui selectable celled padded table">
            { transactionRows }
          </table>
        </div>
      )
    // });  from the promise closing
  },

  _onChange: function() {
    this.setState(this.getInitialState());
  }

});

var ActiveTransaction = React.createClass({
  // returns power usage data
  render: function() {
    return (
      <tr>
        <td>hello</td>
        <td>hello</td>
        <td>hello</td>
        <td>hello</td>
      </tr>
    )
  }
})


module.exports = buyerReservations;
