var React = require('react');
var outletStore = require('../stores/outletStore');
var userStore = require('../stores/userStore');
var ReactAddons = require('react/addons');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var Link = require('react-router').Link;
var Router = require('react-router'); //need this for redirection
var mobile = require('./mobilecheck');
var FooterCheck = require('./footerCheck');


var outletsList = React.createClass({

  getInitialState: function(){
    return {
      data: []
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
    console.log('DID update')
    console.log('window: ', window.innerHeight);
    console.log('body: ', $('body').height());
    FooterCheck.checker();
  },

  componentDidMount: function() {
    console.log('DID mount')
    console.log('window: ', window.innerHeight);
    console.log('body: ', $('body').height());
    FooterCheck.checker();
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
                <h2> 
                  <Link to="reserveOutlet" params={{id: outlet.id }}>
                    { outlet.name } 
                  </Link>
                </h2>
              </td>
              <td>
                <h5>Seller:</h5> 
                <p className="description-text">{ outlet.seller }</p>
              </td>
              <td>
                <h5>Voltage:</h5> 
                <p className="description-text">{ outlet.voltage }</p>
              </td>
              <td>
                <h5>Pricing: </h5>
                <p className="description-text">${ outlet.priceHourly }/hr</p>
                <p className="description-text">${ outlet.priceEnergy }/kWh</p>
              </td>
              <td>
                <h5>Description:</h5> 
                <p className="description-text">{ outlet.description }</p>
                <p className="rating">{ outlet.rating }</p>
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
              <td>
                { outlet.seller }
              </td>
              <td>
                { outlet.voltage }
              </td>
              <td>
                <p>${ outlet.priceHourly }/hr</p>
                <p>${ outlet.priceEnergy }/kWh</p>
              </td>
              <td>
              <p>{ outlet.description }</p>
              <p className="rating">{ outlet.rating }</p>
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
            <tr><th className="single line">Outlet Name</th>
            <th>Seller</th>
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
          <Link to="outletsListMap">
            <button type='button' className='btn btn-default'>Map Outlets</button>
          </Link>
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