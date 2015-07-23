// TODO: validate data, possibly change format of date, allow only one click on reserve outlet.

var React = require('react');
var outletStore = require('../stores/outletStore');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var GoogleMap = require('google-map-react');
// var GoogleMapsAPI = window.google.maps;
var outletStore = require('../stores/outletStore');
var ReactAddons = require('react/addons');
var Marker = require('../../assets/markers/reserveOutlet/marker.jsx');

var DateTimePicker = require('react-widgets').DateTimePicker;
var moment = require('moment');
var Router = require('react-router'); //need this for redirection


// http://jquense.github.io/react-widgets/docs/#/datetime-picker
var Map = React.createClass({

  render: function() {
    return (
      <div className='reservationMap'>
        <GoogleMap
          zoom={15}
          center={[this.props.outletData.lat,this.props.outletData.long]}
        >
          <Marker lat={this.props.outletData.lat} lng={this.props.outletData.long} />
        </GoogleMap>
      </div>
    )
  }
});
var DateTime = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
    var timeConvert = function(time){
      if(time < 10){
        return "0" + time;
      }
      return time;
    };
    var start = this.refs.startTime.state.value;
    var end = this.refs.endTime.state.value;
    var startMonth = start.getMonth() < 10 ? "0"+(start.getMonth()+1) : start.getMonth() +1;
    var endMonth = end.getMonth() < 10 ? "0"+(end.getMonth()+1) : end.getMonth() + 1;
    var startDateString = start.getFullYear() + "-" + startMonth + "-" + start.getDate();
    var endDateString = end.getFullYear() + "-" + endMonth + "-" + end.getDate();
    var startTimeString = timeConvert(start.getHours())+":"+timeConvert(start.getMinutes());
    var endTimeString = timeConvert(end.getHours())+":"+timeConvert(end.getMinutes());
    console.log(startTimeString, endTimeString);

    var newReservation = {
      outletID: this.props.outletData.id,
      start: {
        date: startDateString,
        time: startTimeString
      },
      end: {
        date: endDateString,
        time: endTimeString
      }
    }
    console.log(newReservation);
    outletStore.submitReservation(newReservation).then(function(res){
      console.log('submitReservation, response', res)
    });
  },

  render: function() {
    var that = this;
    return (
      <div>
        <DateTimePicker  ref="startTime" defaultValue={new Date()} />
        <DateTimePicker  ref="endTime" defaultValue={null} />
        <div className="btn btn-default" onClick={that.handleSubmit}>Reserve Outlet</div>
      </div>
    )
  }
});
var OutletInfo = React.createClass({
  render: function() {
    // do something with the photo
    var outletPhoto = <div className="outletPhoto"></div>
    console.log('outletinfo',this.props);
    return (
      <div className="container">
        <tr>
          <td>
            <h2 className="ui center aligned header"> 
                { this.props.outletData.name } 
            </h2>
          </td>
          <td>
            <h5>Seller:</h5> 
            <p className="description-text">Bob Belcher</p>
          </td>
          <td>
            <p className="description-text"><div className="ui star rating" data-rating={ this.props.outletData.rating } data-max-rating={ this.props.outletData.rating }></div></p>
          </td>
          <td>
            <h5>Voltage:</h5> 
            <p className="description-text">{ this.props.outletData.voltage }</p>
          </td>
          <td>
            <h5>Pricing: </h5>
            <p className="description-text">Price by hour: { this.props.outletData.priceHourly }</p>
            <p className="description-text">Price by kWh: { this.props.outletData.priceEnergy }</p>
          </td>
          <td>
            <h5>Description:</h5> 
            <p className="description-text">{ this.props.outletData.description }</p>
          </td>
        </tr>        
      </div>
    )
  }
});
var Availability = React.createClass({
  render: function() {
  // console.log('this.props.reservationData: ', this.props.reservationData)
    return (
      <div>
        <button className="toggle" >BACK</button>
        <table><tbody><TimeBlock reservationData = {this.props.reservationData}/></tbody></table>
        <button className="toggle">FORWARD</button>
      </div>
    )
  }
});
    // var outerHTML = this.state.data.map(function(outlet){
    // })
var TimeBlock = React.createClass({
  render: function() {
  console.log('this.props.reservationData in timeblock: ', this.props.reservationData)
      return (
        <tr>
          <Slot reservationData = {this.props.reservationData}/>
        </tr>
      )
  }
});
var Slot = React.createClass({
  render: function() {
    console.log('this.props.reservationData in slot: ', this.props.reservationData)
    return (
      <td className="slot">
      </td>
    )
  }
});

var reserveOutlet = React.createClass({
  getInitialState: function(){
   return {
      data: [],
      reservations: []
    }
  },
  mixins: [Router.Navigation],
  
  // is onchange necessary?????
  // _onChange: function() {
  //   this.setState(this.getInitialState());
  // },
  componentDidMount: function() {
    var that = this;
    var outletID = this.props.params.id
    outletStore.getOutletById(outletID).then(function(outlet){
      // setState automatically forces a re-render
      // console.log('outlet',outlet);
      that.setState({data: outlet});
    });

    //GET OUTLET RESERVATIONS
    outletStore.getOutletReservations(outletID).then(function(reservations){
      that.setState({reservations: reservations});
      // console.log('reservations in reserveOutlet: ', that.state.reservations);
    });
  },

  render: function() {

    // is user authenticate
    if(!document.cookie){
      this.transitionTo('login');
      return <h1></h1>;
    }
    return (
      <div className='container'>
        <div>
          <Map outletData={this.state.data} />
        </div>
        <div>
          <OutletInfo outletData = {this.state.data}/>
        </div>
        <div>
          <Availability reservationData = {this.state.reservations}/>
        </div>
        <div>
         <DateTime outletData = {this.state.data}/>
        </div>
      </div>
    )
  }

});

module.exports = reserveOutlet;
