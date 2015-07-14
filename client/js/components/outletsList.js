var React = require('react');
var outletStore = require('../stores/outletStore');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var Link = require('react-router').Link;

var outletsList = React.createClass({

  getInitialState: function(){
    return {
      list: outletStore.getOutlets()
    }
  },

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
    //pageHtml is what will be rendered - defaults to this message if users are not logged in
    var pageHtml = (<h1>You are not authorized to see this page. Please sign in</h1>);
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

    if(document.cookie){
      pageHtml = (
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
      );
    }

    return (
      <div className="outletsList container">
        {pageHtml}
      </div>
    )
  },

  _onChange: function() {
    this.setState(this.getInitialState());
  }

});

module.exports = outletsList;