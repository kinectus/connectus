// TODO: validate data, possibly change format of date, allow only one click on reserve outlet.

var React = require('react');
var outletStore = require('../stores/outletStore');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var ReactGoogleMaps = require('react-googlemaps');
var GoogleMapsAPI = window.google.maps;
var outletStore = require('../stores/outletStore');
var ReactAddons = require('react/addons');
var GoogleMap = ReactGoogleMaps.Map;
var LatLng = GoogleMapsAPI.LatLng;
var Marker = ReactGoogleMaps.Marker;
var OverlayView = ReactGoogleMaps.OverlayView;
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
    console.log('in map', new LatLng(this.props.outletData.lat,this.props.outletData.long));
      // <OverlayView
      //       mapPane="floatPane"
      //       style={{padding: 15, backgroundColor: '#fff', border: '1px solid #000'}}
      //       position={new LatLng(37.78,-122.41)}>
      //       <h1>Simple overlay!</h1>
            
      //     </OverlayView>
      return (
      <div className='reservationMap'>
        <GoogleMap
          initialZoom={10}
          initialCenter={new LatLng(37.78,-122.41)}
          width={500}
          height={300}>
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


        // <h2 className="ui center aligned header"> { this.props.outletData.name } </h2>
        //   <br></br>
        //   <h4>Voltage: High</h4>
        //   <br></br>
        //   <h4>Price by hour: { this.props.outletData.priceHourly }</h4>
        //   <br></br>
        //   <h4>Price by kWh: { this.props.outletData.priceEnergy }</h4>
        //   <br></br>
        //   <h4>{ this.props.outletData.description }</h4>

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
  _onChange: function() {
    this.setState(this.getInitialState());
  },
  componentDidMount: function() {
    var that = this;
    var outletID = this.props.params.id
    outletStore.getOutletById(outletID).then(function(outlet){
      // setState automatically forces a re-render
      console.log('outlet',outlet);
      that.setState({data: outlet});
    });
    setTimeout(function() {
      var outlet = {
        address: "125 Sky Pie Ave",
        description: "on the corner guarded by a purple dragon",
        id: 1,
        lat: 20,
        long: -160,
        name: "Hack Reactor Outlet",
        priceEnergy: 5,
        priceHourly: 2,
        priceSuggest: 3,
        voltage: "standard"
      };
      that.setState({data: outlet});
      console.log('new gps',that.state.data);
    }, 2000)
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