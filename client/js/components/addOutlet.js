var React = require('react');
var outletStore = require('../stores/outletStore');
var _ = require('underscore');
var Router = require('react-router'); //need this for redirection
var FooterCheck = require('./footerCheck');
var newOutlets = require('../stores/data/newOutlets');
var addOutlet = React.createClass({
  mixins: [Router.Navigation],

  componentDidMount: function() {
    FooterCheck.checker();
    outletStore.generateNewOutlets(newOutlets);
  },

  getInitialState: function(){
    return {
      lat:'',
      long: '',
      validated: false,
      validationMessage: 'Please validate your address',
      validationButton: ''
    };
  },
  
  handleChange: function(){
    this.setState({validated:false, validationMessage: 'Please validate your address', validationButton: ''});
  },

  moveOn: function(){
    this.setState({validated:true, validated: true, validationButton: 'hidden', validationMessage: (<div className="success">Address Validated</div>)});
  },

  handleAddressSubmit: function(e){
    e.preventDefault();
    var that = this;
    var street = React.findDOMNode(this.refs.street).value.trim();
    var city = React.findDOMNode(this.refs.city).value.trim();
    var state = React.findDOMNode(this.refs.state).value.trim();
    var zip = React.findDOMNode(this.refs.zip).value.trim();

    return outletStore.validateAddress({street:street, city:city, state: state, zip: zip}).then(function(result){
      if(result.err){
        that.setState({validationMessage: (<div className="error">There is an error with your adddress. Please try again</div>)});
      }else if(result.inexact.length > 0){
        var suggestion = result.inexact[0].streetNumber + " " + result.inexact[0].street + ", " + result.inexact[0].city + ", " + result.inexact[0].stateAbbr + ", " + result.inexact[0].postalCode;
        React.findDOMNode(that.refs.street).value = result.inexact[0].streetNumber + " " + result.inexact[0].street;
        React.findDOMNode(that.refs.city).value = result.inexact[0].city;
        React.findDOMNode(that.refs.state).value = result.inexact[0].stateAbbr;
        React.findDOMNode(that.refs.zip).value = result.inexact[0].postalCode;
        that.setState({validationMessage: (<div><div className="error"> Address not valid. Did you mean: {suggestion} ?</div><div className="btn btn-success" onClick={that.moveOn}>Yes</div></div>), validated: false});
      }else if(result.exact.length > 0){
        that.setState({lat: result.exact[0].location.lat, long: result.exact[0].location.lon, validated: true, validationButton: 'hidden', validationMessage: (<div className="success">Address Validated</div>)});
      }else{
        that.setState({validationMessage: (<div className="error">There is an error with your adddress. Please try again</div>)});
      }
    });
    
  },


  handleInfoSubmit: function(e) {
    e.preventDefault();
    var that = this;
    var newOutlet = {
      address: React.findDOMNode(this.refs.street).value.trim() + ';' + React.findDOMNode(this.refs.city).value.trim() + ';' +  React.findDOMNode(this.refs.state).value.trim() + ';' + React.findDOMNode(this.refs.zip).value.trim(),
      name: React.findDOMNode(this.refs.name).value.trim(),
      description: React.findDOMNode(this.refs.description).value.trim(),
      voltage: React.findDOMNode(this.refs.voltage).value.trim(),
      charge: React.findDOMNode(this.refs.charge).value.trim(),
      lat: this.state.lat,
      long: this.state.long
    };

    
    outletStore.submitOutlet(newOutlet).then(function(res){
      that.transitionTo("outletsList");
    });
    
    React.findDOMNode(this.refs.street).value = '';
    React.findDOMNode(this.refs.city).value = '';
    React.findDOMNode(this.refs.state).value = '';
    React.findDOMNode(this.refs.zip).value = '';
    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.description).value = '';
    React.findDOMNode(this.refs.voltage).value = '';
    React.findDOMNode(this.refs.charge).value = '';
    return;
  },
  render: function(){
    var buttonHtml = (<div className="btn btn-warning btn-lg btn-block">Address Validation Needed</div>);
    // is user authenticated
    if(!document.cookie){
      this.transitionTo('about');
      return <h1></h1>;
    }
    
    if(this.state.validated){
      buttonHtml = (<button type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>);
    }

    return (
      <div>
        <div className="container">
        <div className="addoutlet col-md-6 col-md-offset-3">
          <h3>Add an outlet:</h3>
          <h4>{this.state.validationMessage}</h4>
          <form className = "outletAddressForm" onSubmit={this.handleAddressSubmit}>
            <div className="form-group">
              <label>Street</label><br />
              <input type="text" name="street" ref="street" className="form-control" placeholder='Enter your street address...' onChange={this.handleChange}/><br />
            </div>
            <div className="form-group">
              <label>City</label><br />
              <input type="text" name="city" ref="city" className="form-control" placeholder='Enter city...' onChange={this.handleChange}/> <br />
            </div>
            <div className="form-group">
              <label>State</label><br />
              <input type="text" name="state" ref="state" className="form-control" placeholder='Enter state...' onChange={this.handleChange}/><br />
            </div>
            <div className="form-group">
              <label>Zip Code</label><br />
              <input type="text" name="zip" ref="zip" className="form-control" placeholder='Enter zip-code...' onChange={this.handleChange}/><br />
            </div>
            <div className={this.state.validationButton}>
            <button type="submit" className="btn btn-primary" value="Submit">Validate Address</button>
            </div>
          </form>
          <form className = "outletInfoForm" onSubmit={this.handleInfoSubmit}>
            <div className="form-group">
              <label>Outlet Name</label><br />
              <input type="text" name="name" ref="name" className="form-control" placeholder='What do you want to call this outlet?' /><br />
            </div>
            <div className="form-group">
              <label>Instructions for user</label><br />
              <textarea name="description" name="description" ref="description" className="form-control" placeholder="This is a description." /><br />
            </div>
            <div className="form-group">
              <label>Outlet Voltage</label><br />
              <select className="ui dropdown" className="form-control" ref="voltage">
                <option value="standard">Standard</option>
                <option value="high">High</option>
              </select><br />
            </div>
            <div className="form-group">
              <label>Your hourly rate: $3/hr   Suggested price/kWh: $0.20/kWh</label><br />
            </div>
            <div className="form-group">
              <label>Your price/kWh charge: </label><br />
              <input type="text" name="charge" ref="charge" className="form-control" placeholder='ex. 10' />/kWh<br />
            </div>
            {buttonHtml}
          </form>
        </div>
        </div>
      </div>
    )
  }
});

module.exports = addOutlet;