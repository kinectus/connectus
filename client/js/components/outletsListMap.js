var React = require('react');
var outletStore = require('../stores/outletStore');
var userStore = require('../stores/userStore');
var ReactAddons = require('react/addons');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var Link = require('react-router').Link;
var Router = require('react-router'); //need this for redirection
var mobile = require('./mobilecheck');
var GoogleMap = require('google-map-react');
var Marker = require('../../assets/markers/reserveOutlet/marker.jsx');
var shouldPureComponentUpdate = require('react-pure-render/function');
var MainMapLayout =require('./outletsListMap/main_map_layout.js');
var MainMapBlock =require('./outletsListMap/main_map_block.js');
// var IceTable = require('components/controls/fixed_table_examples/ice_table.js');
var Redux = require('redux');
var ReduxReact = require('redux/react');



var Map = React.createClass({
  componentDidMount: function() {

    // $('.mapMarker').append('asdfasdf');
    // $('.mapMarker').click(function(e) {
    //   e.preventDefault();
    //   console.log('clicked');
    // })
  },
  outletTable: <div></div>,
  displayOutletData: function(key, childProps) {
    console.log('clicked-----------', childProps);
    var outlet = childProps.data;
    this.outletTable = (
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
                <Link to="reserveOutlet" params={{id: outlet.id }}>
                  { outlet.name } 
                </Link>
              </td>
              <td>
                { outlet.seller }
              </td>
              <td>
                { outlet.voltage }
              </td>
              <td>
                Price by hour: { outlet.priceHourly }
                Price by kWh: { outlet.priceEnergy }
              </td>
              <td>
                { outlet.description }
              </td>
              <td>
  
              </td>
            </tr>
        </tbody>
      </table>
    )
  },
  render: function() {
    var that = this;
    var markers = this.props.data.map(function(outlet) {
      return (
        <Marker className ='mapMarker' data={outlet} lat={outlet.lat} lng={outlet.long} />
      )
    });

    return (
      // change this class name and adjust the css jamie
      <div>
        <div>
          {this.outletTable}
        </div>
        <div className='reservationMap'>
          <GoogleMap onChildClick={that.displayOutletData}
            zoom={15}
            // eventually use user's gps coordinates
            center={[37.78,-122.4]}
          >
            {markers}
          </GoogleMap>
        </div>
      </div>
    )
    
  }
});


var outletsListMap = React.createClass({
  getInitialState: function(){
    return {
      data: []
    }
  },
  mixins: [Router.Navigation], //makes the router navigation information available for use (need this for redirection)
  componentDidMount: function() {
    var that = this;
    // change function so that it retrieves only outlets near users location
    outletStore.getOutlets().then(function(outletData){
      outletData.map(function(outlet){
        userStore.getUsernameById(outlet.id).then(function(user){
          console.log(user.username)
          outlet['seller'] = user.username;
          that.setState({data: outletData});
        })
      })
    })
  },
  render: function() {
    // is the user authenticated?
    if(!document.cookie){
      this.transitionTo('login');
      return <h1></h1>;
    }
    var that = this;
   
    return (
      <div onClick={this.displayOutletData} className='container'>
        <Link to="outletsList">
          <button type='button' className='btn btn-default'>List Outlets</button>
        </Link>
        <div>
           <Map data={this.state.data} />
        </div>
      </div>
    )
  },

  _onChange: function() {
    this.setState(this.getInitialState());
  }
});

module.exports = outletsListMap;