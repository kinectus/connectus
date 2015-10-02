//Dependencies
var React = require('react');
var outletStore = require('../../stores/outletStore');
var userStore = require('../../stores/userStore');
var moment = require('moment');
var Router = require('react-router'); //need this for redirection
var FooterCheck = require('../footerCheck');

// Child Componenets
var Map = require('./map');
var Viewer = require('./availability/viewer');
var OutletInfo = require('./outletInfo');
var DateTime = require('./dateTime');

// Parent reservation component for page child components

var reserveOutlet = React.createClass({
  getInitialState: function(){
   return {
      data: []
    }
  },

  mixins: [Router.Navigation],

  componentDidMount: function() {
    var that = this;
    var outletID = this.props.params.id
    outletStore.getOutletById(outletID).then(function(outlet){
      userStore.getUsernameById(outlet.seller_id).then(function(user){
          outlet['seller'] = user.fullname;
          that.setState({data: outlet});
        });
    });
    FooterCheck.checker();
  },

  render: function() {
    var that = this;
    // is user authenticated
    if(!document.cookie){
      this.transitionTo('about');
      return <h1></h1>;
    }
    return (
      <div className='container'>
        <div>
          <Map outletData={this.state.data} />
        </div>
        <div>
          <Viewer outletID = {this.props.params.id} />
        </div>
        <div className="row">
          <div className="outlet-data col-md-8">
            <OutletInfo outletData = {this.state.data} />
          </div>
          <div className="date-time col-md-4">
            <h3>Reserve this outlet:</h3>
            <DateTime outletData = {this.state.data} />
          </div>
        </div>
      </div>
    )
  }

});

module.exports = reserveOutlet;
