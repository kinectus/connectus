var React = require('react');
var outletStore = require('../stores/outletStore');
var userStore = require('../stores/userStore');
var ReactAddons = require('react/addons');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var Link = require('react-router').Link;
var Router = require('react-router'); //need this for redirection
var mobile = require('./mobilecheck');
var FooterCheck = require('./footerCheck');
var _ = require('underscore');


var outletsList = React.createClass({

  getInitialState: function(){
    return {
      data: [],
      count: 0,
      sortBy: {}
    }
  },

  mixins: [Router.Navigation], //makes the router navigation information available for use (need this for redirection)

  componentWillMount: function() {
    var that = this;
    outletStore.getOutlets().then(function(outletData){
      outletData.map(function(outlet){
        userStore.getUsernameById(outlet.seller_id).then(function(user){
          outlet['seller'] = user.fullname;
          that.setState({data: outletData});
        });
      });
    });
  },

  componentDidUpdate: function() {
    FooterCheck.checker();
  },

  componentDidMount: function() {
    FooterCheck.checker();
  },

  sort: function(by) {
    // store the state of the sort
    if(this.state.sortBy[by]) {
      this.state.sortBy[by]++;
    } else {
      this.state.sortBy[by] = 1;
    }

    var outlets = this.state.data;
    if(this.state.sortBy[by] % 2 !== 0) {
      // sort ascending
      this.state.data = _.sortBy(outlets, function(outlet) {
        return by==='priceEnergy'? outlet[by] : outlet[by].toUpperCase();
      });
    } else {
      // sort descending
      this.state.data.reverse();
    }
    
    this.forceUpdate();
  },

  render: function() {
    // is the user authenticated?
    if(!document.cookie){
      this.transitionTo('login');
      return <h1></h1>;
    }

    var isMobile = mobile();

    var that = this;

    // outlet data list
    if (this.state.data.length !==0) {
      if(isMobile) {
        var outletHtml = this.state.data.map(function(outlet) {
          return (
            <tr key={outlet.id} onClick={that.reserveOutlet}>
              <td>
                <h2> 
                  <Link to="reserveOutlet" params={{id: outlet.id }}>
                    { outlet.name } 
                  </Link>
                </h2>
              </td>
              <td>
                <Link to="reserveOutlet" params={{id: outlet.id }}>
                  <h5>Seller:</h5> 
                  <p className="description-text">{ outlet.seller }</p>
                </Link>
              </td>
              <td>
                <Link to="reserveOutlet" params={{id: outlet.id }}>
                  <h5>Voltage:</h5> 
                  <p className="description-text">{ outlet.voltage }</p>
                </Link>
              </td>
              <td>
                <Link to="reserveOutlet" params={{id: outlet.id }}>
                  <h5>Pricing: </h5>
                  <p className="description-text">${ outlet.priceEnergy }/kWh</p>
                  <p className="description-text">${ outlet.priceHourly }/hr</p>
                </Link>
              </td>
              <td>
                <Link to="reserveOutlet" params={{id: outlet.id }}>
                  <h5>Description:</h5> 
                  <p className="description-text">{ outlet.description }</p>
                </Link>
              </td>
            </tr>
          )
        });
      } else {
        var outletHtml = this.state.data.map(function(outlet) {
          return (
            <tr key={outlet.id} onClick={that.reserveOutlet}>
              <td>
                <h2> 
                  <Link to="reserveOutlet" params={{id: outlet.id }}>
                    { outlet.name } 
                  </Link>
                </h2>
              </td>
              <td className="centered">
                <Link to="reserveOutlet" params={{id: outlet.id }}>
                  { outlet.seller }
                </Link>
              </td>
              <td className="centered">
                <Link to="reserveOutlet" params={{id: outlet.id }}>
                  { outlet.voltage }
                </Link>
              </td>
              <td className="centered">
                <Link to="reserveOutlet" params={{id: outlet.id }}>
                  <p>${ outlet.priceHourly }/hr</p>
                  <p>${ outlet.priceEnergy }/kWh</p>
                </Link>
              </td>
              <td className="centered">
                <Link to="reserveOutlet" params={{id: outlet.id }}>
                  <p>{ outlet.description }</p>
                </Link>
              </td>
            </tr>
          )
        });
      }
    }

    if(isMobile) {
      var tableHead = (
        <table className="table table-hover">
        <tbody> 
          { outletHtml }
        </tbody>
      </table>
      )
    } else {

      var tableHead = (
        <table className="table table-hover">
          <thead>
            <tr><th className="single line" onClick={that.sort.bind(that, 'name')}><div className="arrows"></div><h4>Outlet Name</h4></th>
            <th onClick={that.sort.bind(that, 'seller')}><div className="arrows"></div><h4>Seller</h4></th>
            <th onClick={that.sort.bind(that, 'voltage')}><div className="arrows"></div><h4>Voltage</h4></th>
            <th onClick={that.sort.bind(that, 'priceEnergy')}><div className="arrows"></div><h4>Price</h4></th>
            <th onClick={that.sort.bind(that, 'description')}><div className="arrows"></div><h4>Description</h4></th>
          </tr></thead>
        <tbody>
          { outletHtml }
        </tbody>
      </table>
      )
    }
    
    // includes search bar, map/list button and possibly filter/sort buttons
    var listMenu = (
      <div>
        <div className="ui button"> map</div> 
        <div className="ui input">
          <input type="text" placeholder="Search..."> </input>
        </div>
      </div>
    );

    return (   
      <div className="outletsList container">
        <Link to="outletsListMap">
          <button type='button' className='map-outlets btn btn-default btn-lg'><div className="map-icon"></div>Map of outlets</button>
        </Link>
        {tableHead}
      </div>
    );
  }
});

module.exports = outletsList;