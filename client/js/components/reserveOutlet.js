var React = require('react');
var outletStore = require('../stores/outletStore');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var ReactGoogleMaps = require('react-googlemaps');
var GoogleMapsAPI = window.google.maps;
var outletStore = require('../stores/outletStore');

var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var OverlayView = ReactGoogleMaps.OverlayView;

// var outletInfo = React.createClass({
//   render: function() {
//     var outletID = this.props.params.id
//     var outlet = outletStore.getOutletById(outletID)
//     console.log(outlet);
//     return <h4>outlet</h4>
//   }
// });

var reserveOutlet = React.createClass({

  render: function() {

    var outletID = this.props.params.id
    var outlet = outletStore.getOutletById(outletID)

    var outletInfo = <div><h2 className="ui center aligned header"> { outlet.name } </h2>
        { outlet.seller }
        Voltage: { outlet.voltage }
        Price by hour: { outlet.priceHr }
        Price by kWh: { outlet.pricekWh }
        { outlet.description }
      </div>

    var outletPhoto = <div className="outletPhoto"></div>

    return (
      <div className='container'>
        <div>
          <Map
          initialZoom={10}
          initialCenter={new GoogleMapsAPI.LatLng(-41.2864, 174.7762)}
          width={700}
          height={300}>

          <Marker
            onClick={this.handleClick}
            position={new GoogleMapsAPI.LatLng(-41.2864, 174.7762)} />

          <OverlayView
            style={{backgroundColor: '#fff'}}
            position={new GoogleMapsAPI.LatLng(-41.2864, 174.7762)}>
            <p>Some content</p>
          </OverlayView>
          </Map>
        </div><div>
          {outletInfo}
          {outletPhoto}
        </div>
      </div>
    )
  }

});


// module.exports = {
//   outletMap: outletMap,
//   outletInfo: outletInfo
// }

module.exports = reserveOutlet;

// taken from the docs ..

// React.render(
//   <Map
//     initialZoom={10}
//     initialCenter={new GoogleMapsAPI.LatLng(-41.2864, 174.7762)}>

//     <Marker
//       onClick={handleClick}
//       position={new GoogleMapsAPI.LatLng(-41.2864, 174.7762)} />

//     <OverlayView
//       style={{backgroundColor: '#fff'}}
//       position={new GoogleMapsAPI.LatLng(-41.2864, 174.7762)}>
//       <p>Some content</p>
//     </OverlayView>
//   </Map>,
//   mountNode
// );