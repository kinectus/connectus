
var React = require('react');
var outletStore = require('../stores/outletStore');
var ReactAddons = require('react/addons');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var Link = require('react-router').Link;
var Router = require('react-router'); //need this for redirection
var mobile = require('./mobilecheck');
var GoogleMap = require('google-map-react');


var outletsList = React.createClass({

  getInitialState: function(){
    return {
      data: []
    }
  },

  mixins: [Router.Navigation], //makes the router navigation information available for use (need this for redirection)

  // reserveOutlet: function(id){
  //   ConnectusDispatcher.dispatch({
  //       action: 'CLICK_OUTLET',
  //       id: id
  //   });
  // },

  componentDidMount: function() {
    var that = this;
    console.log('component mounted')
    outletStore.getOutlets().then(function(outletData){
      that.setState({data: outletData});
      $('.ui.rating').rating();
    });
  },

  render: function() {

    // is the user authenticated?
    if(!document.cookie){
      this.transitionTo('login');
      return <h1></h1>;
    }

    var isMobile = mobile();
    if (isMobile) {
      console.log('MOBILE')
    }

    var that = this;
    // outlet data list
    if (this.state.data.length !==0) {
      if(isMobile) {
        var outletHtml = this.state.data.map(function(outlet) {
          return (
            <tr key={outlet.id} onClick={that.reserveOutlet}>
              <td>
                <h2 className="ui center aligned header"> 
                  <Link to="reserveOutlet" params={{id: outlet.id }}>
                    { outlet.name } 
                  </Link>
                </h2>
              </td>
              <td>
                <h5>Seller:</h5> 
                <p className="description-text">Bob Belcher</p>
              </td>
              <td>
                <p className="description-text"><div className="ui star rating" data-rating={ outlet.rating } data-max-rating={ outlet.rating }></div></p>
              </td>
              <td>
                <h5>Voltage:</h5> 
                <p className="description-text">{ outlet.voltage }</p>
              </td>
              <td>
                <h5>Pricing: </h5>
                <p className="description-text">Price by hour: { outlet.priceHourly }</p>
                <p className="description-text">Price by kWh: { outlet.priceEnergy }</p>
              </td>
              <td>
                <h5>Description:</h5> 
                <p className="description-text">{ outlet.description }</p>
              </td>
            </tr>
          )
        });
      } else {
        var outletHtml = this.state.data.map(function(outlet) {
          return (
            <tr key={outlet.id} onClick={that.reserveOutlet}>
              <td>
                <h2 className="ui center aligned header"> 
                  <Link to="reserveOutlet" params={{id: outlet.id }}>
                    { outlet.name } 
                  </Link>
                </h2>
              </td>
              <td>
                Seller: { outlet.seller }
              </td>
              <td>
                <div className="ui star rating" data-rating={ outlet.rating } data-max-rating={ outlet.rating }>{ outlet.rating }</div>
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
            </tr>
          )
        });
      }
    }

    if(isMobile) {
      var tableHead = (
        <table className="ui selectable celled padded table">
        <tbody>
          { outletHtml }
        </tbody>
      </table>
      )
    } else {
      var tableHead = (
        <table className="ui selectable celled padded table">
          <thead>
            <tr><th className="single line">Outlet Name</th>
            <th>Seller</th>
            <th>Rating</th>
            <th>Voltage</th>
            <th>Price</th>
            <th>Description</th>
          </tr></thead>
        <tbody>
          { outletHtml }
        </tbody>
      </table>
      )
    }
    // includes search bar, map/list button and possibly filter/sort buttons
    
    //onClick={this.handleSubmit}
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
          {tableHead}
        </div>
    )
    // });  from the promise closing
  },

  _onChange: function() {
    this.setState(this.getInitialState());
  }

});

module.exports = outletsList;