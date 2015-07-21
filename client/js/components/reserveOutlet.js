// TODO: validate data, possibly change format of date, allow only one click on reserve outlet.

var React = require('react');
var outletStore = require('../stores/outletStore');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var GoogleMap = require('google-map-react');
// var GoogleMapsAPI = window.google.maps;
var outletStore = require('../stores/outletStore');
var ReactAddons = require('react/addons');
var Marker = require('../../assets/markers/reserveOutlet/marker.jsx');

// var GoogleMap = ReactGoogleMaps.Map;
// var LatLng = GoogleMapsAPI.LatLng;
// var Marker = ReactGoogleMaps.Marker;
// var OverlayView = ReactGoogleMaps.OverlayView;
var DateTimePicker = require('react-widgets').DateTimePicker;
var moment = require('moment');
var Router = require('react-router'); //need this for redirection


// http://jquense.github.io/react-widgets/docs/#/datetime-picker
var Map = React.createClass({
  // getInitialState: function() {
  //   console.log('props', this.props.loc)
  //   return {
  //     center: new LatLng(this.props.loc.lat, this.props.loc.long),
  //     count: 0
  //   };
  // },
  render: function() {
    console.log('in map props', GoogleMap);
console.log('marker',Marker);
    return (
      <div className='reservationMap'>
        <GoogleMap
          zoom={15}
          center={[this.props.outletData.lat,this.props.outletData.long]}
          googleMapsApi={google.maps}>
          <Marker lat={this.props.outletData.lat} lng={this.props.outletData.long} />
        </GoogleMap>
      </div>
    )
  }
});
var DateTime = React.createClass({
  render: function() {
    return (
      <div>
        <DateTimePicker  ref="startTime" defaultValue={new Date()} />
        <DateTimePicker  ref="endTime" defaultValue={null} />
        <div className="ui button" onClick={this.handleSubmit}>Reserve Outlet</div>
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
  
var reserveOutlet = React.createClass({
  getInitialState: function(){
   return {
      data: []
    }
  },
  mixins: [Router.Navigation],
  // _onChange: function() {
  //   // this.setState(this.getInitialState());
  // },
  componentDidMount: function() {
    var that = this;
    var outletID = this.props.params.id
    outletStore.getOutletById(outletID).then(function(outlet){
      // setState automatically forces a re-render
      console.log('outlet',outlet);
      that.setState({data: outlet});

      // var initialize = function() {
      //   var mapOptions = {
      //     zoom: 8,
      //     center: new google.maps.LatLng(-34.397, 150.644)
      //   };
      //   var elem = document.getElementByClassId('map-canvas');
      //   console.log(elem);
      //   var map = new google.maps.Map(elem, mapOptions)
      // };
      // var loadScript = function() {
      //   var script = document.createElement('script');
      //   script.type = 'text/javascript';
      //   script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
      //       '&signed_in=true&callback=initialize';
      //   document.body.appendChild(script);
      // }
      // window.onload = loadScript;
    });
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var newTransaction = {
      outletID: this.props.params.id,
      start: {
        date: moment(this.refs.startTime.state.value).utc().format('MM/DD/YYYY'),
        time: moment(this.refs.startTime.state.value).utc().format('HH:MM')
      },
      end: {
        date: moment(this.refs.endTime.state.value).utc().format('MM/DD/YYYY'),
        time: moment(this.refs.endTime.state.value).utc().format('HH:MM')
      }
    }
    console.log(newTransaction);
    outletStore.submitTransaction(newTransaction).then(function(res){
      console.log('ADDed Transaction, response', res)
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
         <DateTime />
        </div>
      </div>
    )
  }

});

module.exports = reserveOutlet;