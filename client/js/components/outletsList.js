var React = require('react');
var outletStore = require('../stores/outletStore');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var Link = require('react-router').Link;
var Router = require('react-router'); //need this for redirection
var outletsList = React.createClass({

  getInitialState: function(){
    return {
      list: outletStore.getOutlets()
    };
  },

  mixins: [Router.Navigation], //makes the router navigation information available for use (need this for redirection)

  moreOutletInfo: function(){
    return <div className="ui relaxed divided list">
      <ul>
          { outletHtml }
      </ul>
    </div>;
  },

  // reserveOutlet: function(id){
  //   ConnectusDispatcher.dispatch({
  //       action: 'CLICK_OUTLET',
  //       id: id
  //   });
  // },

  componentDidMount: function() {
    outletStore.addChangeListener(this._onChange);
  },

  render: function() {
    var that = this;
    var outlets = outletStore.getOutlets();
    
    var outletHtml = outlets.map(function(outlet) {
      return <Link to="reserveOutlet" params={{id: outlet.id}}>
        <tr key={outlet.id} onClick={that.reserveOutlet}>
          <td>
            <h2 className="ui center aligned header"> { outlet.name } </h2>
          </td>
          <td className="single line">
            { outlet.seller }
          </td>
          <td>
            <div className="ui star rating" data-rating={ outlet.rating } data-max-rating={ outlet.rating }>{ outlet.rating }</div>
          </td>
          <td className="right aligned">
            Voltage: { outlet.voltage }
          </td>
          <td>
            Price by hour: { outlet.priceHr }
            Price by kWh: { outlet.pricekWh }
          </td>
          <td>
          { outlet.description }
          </td>
        </tr>
      </Link>
    });

    //if user is not loggedin, they will be redirected to login
    if(!document.cookie){
      this.transitionTo('login');
      return <h1></h1>;
    }

    return (
      <div className="outletsList container">
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
      </div>
    )
  },

  _onChange: function() {
    this.setState(this.getInitialState());
  }

});

module.exports = outletsList;