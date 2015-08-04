var React = require('react');
var OutletListConstants = require('../constants/OutletListConstants');
var outletStore = require('../stores/outletStore');
var userStore = require('../stores/userStore');
var Router = require('react-router'); //need this for redirection
var Link = require('react-router').Link;
var mobile = require('./mobilecheck');
var GoogleMap = require('google-map-react');
var Marker = require('../../assets/markers/reserveOutlet/marker.jsx');
var FooterCheck = require('./footerCheck');

var outletsListMap = React.createClass({
  getLocation: function() {
    if ("geolocation" in navigator) {
      var that = this;
      navigator.geolocation.getCurrentPosition(function(position) {
        that.setState({
          userLocation: {
            lat: position.coords.latitude,
            long: position.coords.longitude
          }
        });
        console.log(that.state.userLocation);
      });
    } 
  },

  getInitialState: function(){
    return {
      outletData: [],
      outletTable: 'hello',
      userLocation: {}
    };
  },
  
  mixins: [Router.Navigation], //makes the router navigation information available for use (need this for redirection)
  
  componentDidMount: function() {
    this.getLocation();
    FooterCheck.checker();
    var that = this;
    // TODO: change function so that it retrieves only outlets near users location
    outletStore.getOutlets().then(function(outletData){
      outletData.map(function(outlet){
        userStore.getUsernameById(outlet.id).then(function(user){
          console.log(user.username)
          outlet['seller'] = user.username;
          that.setState({outletData: outletData});
        });
      });
    });
  },

  outletTableData: <div></div>,

  displayOutletData: function(key, childProps) {
    var outlet = childProps.data;
    console.log('outlettttt', outlet);
    this.outletTableData = (
      <table className="table table-hover">
          <thead>
            <tr><th className="single line">Outlet Name</th>
            <th>Seller</th>
            <th>Voltage</th>
            <th>Price</th>
            <th>Description</th>
          </tr></thead>

        <tbody>
          <tr>
              <td>
                <a href={OutletListConstants.BASE_URL+'#/outlets/'+outlet.id}>{ outlet.name}</a>
              </td>
              <td>
                <a href={OutletListConstants.BASE_URL+'#/outlets/'+outlet.id}>{ outlet.seller }</a>
              </td>
              <td>
                <a href={OutletListConstants.BASE_URL+'#/outlets/'+outlet.id}>{ outlet.voltage }</a>
              </td>
              <td>
                <a href={OutletListConstants.BASE_URL+'#/outlets/'+outlet.id}>
                  Price by hour: { outlet.priceHourly }
                  Price by kWh: { outlet.priceEnergy }
                </a>
              </td>
              <td>
                <a href={OutletListConstants.BASE_URL+'#/outlets/'+outlet.id}>
                  { outlet.description }
                </a>
              </td>
          </tr>
        </tbody>
      </table>
    )
    this.forceUpdate();  
  },

  render: function() {
    // is the user authenticated?
    if(!document.cookie){
      this.transitionTo('about');
      return <h1></h1>;
    }
    var that = this;

    var markers = this.state.outletData.map(function(outlet) {
      return (
        <Marker className ='mapMarker' data={outlet} lat={outlet.lat} lng={outlet.long} />
      )
    });
    // TODO: change this class name and adjust the css jamie
    var map = (
      <div>
        <div className='reservationMap'>
          <GoogleMap onChildClick={that.displayOutletData}
            zoom={12}
            center={[this.state.userLocation.lat,this.state.userLocation.long]}
          >
            {markers}
          </GoogleMap>
        </div>
        <div>
          {this.outletTableData}
        </div>
      </div>
    );
   
    return (
      <div onClick={this.displayOutletData} className='container outletsListMap'>
         <Link to="outletsList">
          <button type='button' className='map-outlets btn btn-default btn-lg'><div className="map-icon"></div>List of outlets</button>
        </Link>
        <div>
           {map}
        </div>
      </div>
    );
  }
});

module.exports = outletsListMap;