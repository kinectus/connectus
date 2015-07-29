var React = require('react');
var outletStore = require('../stores/outletStore');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var OutletListConstants = require('../constants/OutletListConstants')
var ReactAddons = require('react/addons');
var Link = require('react-router').Link;
var Router = require('react-router'); //need this for redirection
var outletServices = require('../services/outletServices.js');
var moment = require('moment');
var $ = require('jquery');

var buyerReservations = React.createClass({

  getInitialState: function(){
    return {
      data: [],
      realtime: {
        totalKwh: 0,
        watts: 0,
        clientData: {
          outlet: {
            priceEnergy: 0,
            priceHourly: 0
          }
        }
      }
    }
    // return {
      // data:  {
      //   totalKwh: 0,
      //   watts: 0,
      //   clientData: {
      //     outlet: {
      //       priceEnergy: 0,
      //       priceHourly: 0
      //     }
      //   }
      // }
    // };
  },

  mixins: [Router.Navigation], //makes the router navigation information available for use (need this for redirection)

  // reserveOutlet: function(id){
  //   ConnectusDispatcher.dispatch({
  //       action: 'CLICK_OUTLET',
  //       id: id
  //   });
  // },

// click on
  // get transactionId, get context (value of this - "on" buton)
  // turnOn
    // create socket (use transactionId in the socket)
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
      // outletServices.turnOutletOff(transaction); //connects with powerServer
      that.transitionTo('paymentsPage');
      return transaction;
    });
  },

  turnOn: function(transaction) {
    outletServices.turnOutletOn(transaction)

    // this.updateData();
    var that = this;
    var socket = io.connect(OutletListConstants.BASE_URL);
    var transactionId = transaction.id+'';
    socket.on(transactionId, function (data) {
      console.log("got energy!", data);

      var totalCost = Math.round(data.totalKwh * data.clientData.outlet.priceEnergy * 1000)/1000 + Math.round(data.clientData.outlet.priceHourly/(60*60)*10 *1000 )/1000;
      var avgWatts = Math.round ( data.avgWatts *10)/10;
      var targetClass = '.'+transactionId;
      $(targetClass).find('.totalKwh').text(data.totalKwh);
      $(targetClass).find('.total').text(totalCost);
      $(targetClass).find('.watts').text(avgWatts);
      // console.log('that.refs[1]);
      // that.refs.pow.setState({realtime: data})
      // that.refs[transactionId].setState({realtime: data})
      // that.setState({realtime: data})
      // console.log(that);
      // $( that.refs[transactionId] ).
    });
  },

  //function to turn off powerServer found in setCurrent Transaction

  render: function() {
    var power = '';
    // is the user authenticated?
    if(!document.cookie){
      this.transitionTo('login');
      return <h1></h1>;
    }

    var that = this;
    console.log('STATE:  ', this.state)
    // Math.round(that.state.realtime.totalKwh*1000)/1000 
    if (this.state.data.length !==0) {
      var transactionRows = this.state.data.map(function(transaction) {
        return (
          <table className='table-hover transaction-rows'>
            <tr key={ transaction.id } onClick={ that.reserveOutlet } className={moment(transaction.endTime.date + " " + transaction.endTime.slot.time,"YYYY-MM-DD HH:mm") < moment() ? 'expired' + ' regTransRow' : 'regTransRow'}>
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
            <tr className={transaction.id}>
              <td><h4>Total kWh</h4><p className="totalKwh"></p></td>
              <td><h4>Total $</h4><p className="total"></p></td>
              <td><h4>Watts</h4><p className="watts"></p></td>
            </tr>
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

// var ActiveTransaction = React.createClass({

//   getInitialState: function(){
//     return {
//       data:  {
//         totalKwh: 0,
//         watts: 0,
//         clientData: {
//           outlet: {
//             priceEnergy: 0,
//             priceHourly: 0
//           }
//         }
//       }
//     };
//   },

//   componentDidMount: function(){
//     this.updateData();
//   },

//   updateData: function() {
//     // var context = this.props.context;
//     // var transactionId = this.props.transactionId;
//     // var socket = io.connect(OutletListConstants.BASE_URL);
//     // socket.on(transactionId, function (data) {
//     //   console.log("got energy!", data);
//     //   context.setState({data: data})
//     // });

    
//   },

//   // returns power usage data
//   render: function() {
//     var transactionId = this.props.transaction.id + '';
//     return (
      
//     )
//   }
// })


module.exports = buyerReservations;
