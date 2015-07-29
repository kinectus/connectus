var React = require('react');
var outletStore = require('../stores/outletStore');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var OutletListConstants = require('../constants/OutletListConstants')
var ReactAddons = require('react/addons');
var Link = require('react-router').Link;
var Router = require('react-router'); //need this for redirection
var outletServices = require('../services/outletServices.js');
var moment = require('moment');

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
    console.log(moment("2015-07-30 00:30", "YYYY-MM-DD HH:mm") > moment());
    outletStore.getBuyerReservations().then(function(transactionsData){
      that.setState({data: transactionsData});
    });
  },

  setCurrentTransaction: function(transaction){
    console.log(transaction)
    var that =this;
    outletStore.setCurrentTransaction({id: transaction.id, currentStatus: true, paid: false}).then(function(transaction){
      // outletServices.turnOutletOff(transaction);
      that.transitionTo('paymentsPage');
      return transaction;
    });
  },

  turnOn: function(transaction) {
    outletServices.turnOutletOn(transaction)
    // .then(this.updateData); streams data from power server

    // this.updateData();
  },

  // moved to set current transaction
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

    console.log('STATE.DATA:  ', this.state.data)

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
                <div className="btn" onClick={that.turnOn.bind(that, transaction)}>ON</div>
                <div className="btn" onClick={that.setCurrentTransaction.bind(that, transaction)}>OFF</div>
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

  getInitialState: function(){
    return {
      data: []
    };
  },

  componentDidMount: function(){
    this.updateData();
  },

  updateData: function() {
    var that = this;

    // var socket = io.connect(OutletListConstants.BASE_URL);
    var socket = io.connect('http://localhost:3000');

    socket.on("energy", function (data) {
      console.log("got energy!", data);
      that.setState({data: data})
    });
  },

  // returns power usage data
  render: function() {

    return (
      <tr>
        <td><h4>Total kWh</h4><p>{ this.state.data.totalKwh }</p></td>
        <td><h4>Total $</h4><p>{ this.state.data.totalKwh * (.3)}</p></td>
        <td><h4>Watts</h4><p>{ this.state.data.watts }</p></td>
      </tr>
    )
  }
})


module.exports = buyerReservations;
