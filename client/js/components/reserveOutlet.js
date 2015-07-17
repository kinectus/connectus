var React = require('react');
var outletStore = require('../stores/outletStore');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var ReactGoogleMaps = require('react-googlemaps');
var GoogleMapsAPI = window.google.maps;
var outletStore = require('../stores/outletStore');
var require
var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var OverlayView = ReactGoogleMaps.OverlayView;
var DateTimePicker = require('react-widgets').DateTimePicker

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
  handleSubmit: function(e) {
    e.preventDefault();
    console.log('transaction');
    var transaction = {
      start: React.findDOMNode(this.refs.startTime).value,
      end: React.findDOMNode(this.refs.endTime).value
    };
    console.log(transaction);
  },
  render: function() {
    if (this.state.data.length !== 0){
      var map = (<div className='reservationMap'>

            <Map
            initialZoom={10}
            initialCenter={new GoogleMapsAPI.LatLng(this.state.data.lat, this.state.data.long)}>

            <Marker
              onClick={this.handleClick}
              position={new GoogleMapsAPI.LatLng(this.state.data.lat, this.state.data.long)} />

            </Map></div>)

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
    // var change = function(name, value) {
    //   this.setState({
    //     ['value' + name]: value;
    //   });
    // }
    // <DateTimePicker value={this.state.value0} onChange={change.bind(null, '0')} defaultValue={new Date()} />
    // <DateTimePicker value={this.state.value1} onChange={change.bind(null, '1')} defaultValue={null} />
    
    var dateTimePicker = (
      <div>
        <DateTimePicker name="starTime" ref="startTime" defaultValue={new Date()} />
        <DateTimePicker name="endTime" ref="endTime" defaultValue={null} />
      </div>
    )

    var reserveButton = (
      <div className="ui button" onClick={this.handleSubmit}>Reserve Outlet</div>
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
        <div>
          { reserveButton }
        </div>
      </div>
    )
  }

});

module.exports = reserveOutlet;