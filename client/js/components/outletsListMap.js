var React = require('react');
var OutletListConstants = require('../constants/OutletListConstants');
var outletStore = require('../stores/outletStore');
var userStore = require('../stores/userStore');
var ReactAddons = require('react/addons');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var Router = require('react-router'); //need this for redirection
var Link = require('react-router').Link;
var mobile = require('./mobilecheck');
var GoogleMap = require('google-map-react');
var Marker = require('../../assets/markers/reserveOutlet/marker.jsx');
// var shouldPureComponentUpdate = require('react-pure-render/function');
// var MainMapLayout =require('./outletsListMap/main_map_layout.js');
// var MainMapBlock =require('./outletsListMap/main_map_block.js');
// var IceTable = require('components/controls/fixed_table_examples/ice_table.js');
var Redux = require('redux');
var ReduxReact = require('redux/react');

// var Map = React.createClass({
//   ,
//   render: function() {
    
//   }
// });

var outletsListMap = React.createClass({
  getInitialState: function(){
    return {
      outletData: [],
      outletTable: 'hello'
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
          that.setState({outletData: outletData});
        })
      })
    })
  },
  outletTableData: <div></div>,
  displayOutletData: function(key, childProps) {
    console.log('clicked-----------', childProps);
    var outlet = childProps.data;
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
    this.forceUpdate();  
  },
  render: function() {
    // is the user authenticated?
    if(!document.cookie){
      this.transitionTo('login');
      return <h1></h1>;
    }
    var that = this;

    var markers = this.state.outletData.map(function(outlet) {
      return (
        <Marker className ='mapMarker' data={outlet} lat={outlet.lat} lng={outlet.long} />
      )
    });
    // change this class name and adjust the css jamie
    // {this.props.outletsData.outletTable}
    var map = (
      <div>
        <div className='reservationMap'>
          <GoogleMap onChildClick={that.displayOutletData}
            zoom={15}
            // eventually use user's gps coordinates
            center={[37.78,-122.4]}
          >
            {markers}
          </GoogleMap>
        </div>
        <div>
          {this.outletTableData}
        </div>
      </div>
    )
   
    return (
      <div onClick={this.displayOutletData} className='container'>
         <Link to="outletsList">
          <button type='button' className='btn btn-default'>List Outlets</button>
        </Link>
        <div>
           {map}
        </div>
      </div>
    )
  },

  _onChange: function() {
    this.setState(this.getInitialState());
  }
});

module.exports = outletsListMap;