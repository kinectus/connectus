var React = require('react');
var outletStore = require('../stores/outletStore');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var ReactAddons = require('react/addons');
var Link = require('react-router').Link;
var Router = require('react-router'); //need this for redirection
var outletServices = require('../services/outletServices.js')
// var io = require('socket.io');

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
    outletStore.getBuyerReservations().then(function(reservationData){
      console.log(reservationData)
      that.setState({data: reservationData});
    });
  },

<<<<<<< HEAD
  setCurrentTransaction: function(transactionId){
    var that =this;
    outletStore.setCurrentTransaction({id: transactionId, currentStatus: true, paid: false}).then(function(transaction){
      outletServices.turnOutletOff(id);
      that.transitionTo('paymentsPage');
      return transaction;
    });
  },
=======
  // createTransaction: function(){
  //   outletStore.createTransaction().then(function(reservation){
  //     return reservation;
  //   });
  // },
>>>>>>> (realtime data) pulls from power into connectus, debugging socket.io

  turnOn: function(reservation) {
    outletServices.turnOutletOn(reservation);

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

    console.log('STATE.DATA:  ', this.state.data)

    if (this.state.data.length !==0) {
      var reservationRows = this.state.data.map(function(reservation) {
        return (
          <table className='table-hover reservation-rows'>
            <tr key={ reservation.id } onClick={ that.reserveOutlet } className='regTransRow'>
              <td className='regTrans'>
                Start: { reservation.startTime.date} - { reservation.startTime.slot.time }
                <br />
                End: { reservation.endTime.date } - { reservation.endTime.slot.time } 
              </td>
              <td className='regTrans'>
                { reservation.outlet.name } 
              </td>
              <td className='regTrans'>
                Seller: { reservation.seller.fullname }
              </td>
              <td className='regTrans'>
                { reservation.outlet.voltage }
              </td>
              <td className='regTrans'>
                Price by hour: { reservation.outlet.priceHourly }
                <br />
                Price by kWh: { reservation.outlet.priceEnergy }
              </td>
              <td className='regTrans'>
              { reservation.outlet.description }
              </td>
              <td className='regTrans'>
                <div className="btn" onClick={that.turnOn.bind(that, reservation)}>ON</div>
                <div className="btn" onClick={that.turnOff.bind(that, reservation)}>OFF</div>
              </td>
            </tr>
            <ActiveReservation />
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
            { reservationRows }
          </table>
        </div>
      )
    // });  from the promise closing
  },

  _onChange: function() {
    this.setState(this.getInitialState());
  }

});

var ActiveReservation = React.createClass({

  // returns power usage data
  render: function() {
    var socket = io();
    socket.on('energy', function(energy){
      console.log('energy in appjs', energy)
    });

    return (
      <tr>
        <td><h4>Total kWh</h4><p>hello</p></td>
        <td><h4>Total $</h4><p>hello</p></td>
        <td><h4>Watts</h4><p>hello</p></td>
      </tr>
    )
  }
})


module.exports = buyerReservations;
