// TODO: validate data, possibly change format of date, allow only one click on reserve outlet.

var React = require('react');
var outletStore = require('../stores/outletStore');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var ReactGoogleMaps = require('react-googlemaps');
var GoogleMapsAPI = window.google.maps;
var outletStore = require('../stores/outletStore');
var ReactAddons = require('react/addons');
var require
var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var OverlayView = ReactGoogleMaps.OverlayView;
var DateTimePicker = require('react-widgets').DateTimePicker;
var moment = require('moment');

var reserveOutlet = React.createClass({

  getInitialState: function(){
    return {
      data: []
    }
  },

  _onChange: function() {
    this.setState(this.getInitialState());
  },

  componentDidMount: function() {
    var that = this;
    var outletID = this.props.params.id
    outletStore.getOutletById(outletID).then(function(outlet){
      // setState automatically forces a re-render
      console.log(outlet);
      that.setState({data: outlet});
    });
  },
  // getInitialState: function() {
  //   return {value: 'Hello!'};
  // },
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
      outletID: this.props.params.id,
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

    // is user authenticate
    if(!document.cookie){
      this.transitionTo('login');
      return <h1></h1>;
    }
    if (this.state.data.length !== 0){
      var map = (
        <div className='reservationMap'>
          <Map
          initialZoom={10}
          initialCenter={new GoogleMapsAPI.LatLng(this.state.data.lat, this.state.data.long)}>

          <Marker
            onClick={this.handleClick}
            position={new GoogleMapsAPI.LatLng(this.state.data.lat, this.state.data.long)} />

          </Map>
        </div>
      );

      var outletInfo = <div className="ui raised text container segment outletInfoRes">
        <h2 className="ui center aligned header"> { this.state.data.name } </h2>
          <br></br>
          <h4>Voltage: High</h4>
          <br></br>
          <h4>Price by hour: { this.state.data.priceHourly }</h4>
          <br></br>
          <h4>Price by kWh: { this.state.data.priceEnergy }</h4>
          <br></br>
          <h4>{ this.state.data.description }</h4>
        </div>
    } else {
      var outletInfo = ''
    }

    var outletPhoto = <div className="outletPhoto"></div>
    
    // http://jquense.github.io/react-widgets/docs/#/datetime-picker
    var dateTimePicker = (
      <div>
        <DateTimePicker  ref="startTime" defaultValue={new Date()} />
        <DateTimePicker  ref="endTime" defaultValue={null} />
        <div className="ui button" onClick={this.handleSubmit}>Reserve Outlet</div>
      </div>
    )

    return (
      <div className='container'>
        <div>
        { map }
        </div>
        <div>
          { outletInfo }
        </div>
        <div>
          { dateTimePicker }
        </div>
      </div>
    )
  }

});

module.exports = reserveOutlet;