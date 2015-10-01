var React = require('react');
var GoogleMap = require('google-map-react');
var Marker = require('../../../assets/markers/reserveOutlet/marker.jsx');

// Show outlet location

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

module.exports = Map;
