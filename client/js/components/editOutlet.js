var React = require('react');
var outletStore = require('../stores/outletStore');
var Alert = require('react-bootstrap').Alert;
var Link = require('react-router').Link;
var Router = require('react-router');
var FooterCheck = require('./footerCheck');

var editOutlet = React.createClass({
  getInitialState: function(){
   return {
      data: [],
      alert: false,
      alertType: 'alertOrNot',
      lat:'',
      long: '',
      validated: true,
      validationMessage: '',
      validationButton: ''
    };
  },
  mixins: [Router.Navigation],

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

  componentWillMount: function() {
    var that = this;
    var outletID = this.props.params.id;

    outletStore.getOutletById(outletID).then(function(outlet){
      that.setState({outlet: outlet});

      // Parse outlet address
      var semicolon = outlet.address.indexOf(';');

      that.setState({ street: outlet.address.slice( 0, semicolon)});
      var lastSemicolon = semicolon+1;
      semicolon = outlet.address.indexOf(';', semicolon+1);

      that.setState({ city: outlet.address.slice( lastSemicolon, semicolon)});
      lastSemicolon = semicolon+1;
      semicolon = outlet.address.indexOf(';', semicolon+1);

      that.setState({ state: outlet.address.slice( lastSemicolon, semicolon)});
      lastSemicolon = semicolon+1;
      semicolon = outlet.address.length;

      that.setState({ zip: outlet.address.slice( lastSemicolon, semicolon)});
    });
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

    var newOutlet = {
      id: this.state.outlet.id,
      seller_id: this.state.seller_id,
      address: React.findDOMNode(this.refs.street).value.trim() + ';' + React.findDOMNode(this.refs.city).value.trim() + ';' +  React.findDOMNode(this.refs.state).value.trim() + ';' + React.findDOMNode(this.refs.zip).value.trim(),
      name: React.findDOMNode(this.refs.name).value.trim(),
      description: React.findDOMNode(this.refs.description).value.trim(),
      voltage: React.findDOMNode(this.refs.voltage).value.trim(),
      charge: React.findDOMNode(this.refs.charge).value.trim(),
      lat: this.state.lat,
      long: this.state.long
    };

    var same = true;

    for (key in newOutlet){
      if (key === 'charge' && newOutlet[key] !== this.state.outlet.priceEnergy.toString()){
        same = false;
      } else if (key !== 'charge' && newOutlet[key] !== this.state.outlet[key]){
        same = false;
      }
    }

    var that =this;
    outletStore.editOutlet(newOutlet).then(function(res){
      that.setState({alertType: 'updatedAlert'});
    });
  },

  confirm: function(e){
    e.preventDefault();
    this.setState({alert: true});
  },

  hideMe: function(e){
    e.preventDefault();
    this.setState({alert: false});
  },

  newEdits: function(e){
    e.preventDefault();
    this.setState({alertType: 'alertOrNot', alert: false});
  },

  render: function(){
    // is user authenticated
    var buttonHtml = (<button className="btn btn-warning btn-lg btn-block">Address Validation Needed</button>);
    if(!document.cookie){
      this.transitionTo('login');
      return <h1></h1>;
    }

    if(this.state.validated){
      var buttonHid = !this.state.alert ? "notHidden btn btn-primary btn-lg btn-block" : "hidden btn btn-primary btn-lg btn-block";
      buttonHtml = (<button type="submit" onClick={this.confirm} className={buttonHid + "btn btn-primary btn-lg btn-block"}>Submit</button>);
    }

    if (this.state.zip){
      var outlet = this.state.outlet;
      var hidden = !this.state.alert ? "hidden" : "notHidden";
      var alertOrNot = (<Alert className={hidden} bsStyle="info" onDismiss={this.handleAlertDismiss}>
        <h4 className="text-center">Update information on {outlet.name}?</h4>
        <div className="text-center">
          <button type="submit" className="btn btn-default confirming">Update</button>
          <button onClick={this.hideMe} className="btn btn-default confirming">Cancel</button>
        </div>
      </Alert>);
      var updatedAlert = (<Alert bsStyle="info" onDismiss={this.handleAlertDismiss}>
        <div className="text-center">
          <h4>Your udpate has been submitted</h4>
          <button className="btn btn-default confirming"><Link to="/manageOutlets"> Go to your outlets </Link></button>
          <button onClick={this.newEdits} className="btn btn-default confirming">Make More Edits</button>
        </div>
      </Alert>);
      var alert;

      if(this.state.alertType === 'alertOrNot'){
        alert = alertOrNot;
      }else{
        alert = updatedAlert;
      }

      return (
        <div className="container">
          <div className="editOutlet col-md-6 col-md-offset-3">
            <h3>Edit outlet:</h3>
            <h4>{this.state.validationMessage}</h4>
          <form className = "outletAddressForm" onSubmit={this.handleAddressSubmit}>
            <div className="form-group">
              <label>Street</label><br />
              <input type="text" name="street" ref="street" className="form-control" defaultValue={this.state.street} onChange={this.handleChange}/><br />
            </div>
            <div className="form-group">
              <label>City</label><br />
              <input type="text" name="city" ref="city" className="form-control" defaultValue={this.state.city} onChange={this.handleChange}/> <br />
            </div>
            <div className="form-group">
              <label>State</label><br />
              <input type="text" name="state" ref="state" className="form-control" defaultValue={this.state.state} onChange={this.handleChange}/><br />
            </div>
            <div className="form-group">
              <label>Zip Code</label><br />
              <input type="text" name="zip" ref="zip" className="form-control" defaultValue={this.state.zip} onChange={this.handleChange}/><br />
            </div>
            <div className={this.state.validationButton}>
            <button type="submit" className="btn btn-primary" value="Submit">Validate Address</button>
            </div>
          </form>
          <form className = "outletInfoForm" onSubmit={this.handleInfoSubmit}>
            <div className="form-group">
              <label>Outlet Name</label><br />
              <input type="text" name="name" ref="name" className="form-control" defaultValue={this.state.outlet.name} /><br />
            </div>
            <div className="form-group">
              <label>Instructions for user</label><br />
              <textarea name="description" name="description" ref="description" className="form-control" defaultValue={this.state.outlet.description} /><br />
            </div>
            <div className="form-group">
              <label>Outlet Voltage</label><br />
              <select className="ui dropdown" className="form-control" defaultValue={this.state.outlet.voltage} ref="voltage">
                <option value="standard">Standard</option>
                <option value="high">High</option>
              </select><br />
            </div>
            <div className="form-group">
              <label>Your hourly rate: $3/hr   Suggested price/kWh: $0.20/kWh</label><br />
            </div>
            <div className="form-group">
              <label>Your price/kWh charge: </label><br />
              <input type="text" name="charge" ref="charge" className="form-control" defaultValue={this.state.outlet.priceEnergy} />/kWh<br />
            </div>
            {buttonHtml}
            {alert}
          </form>
        </div>
      </div>
    )
    } else {
      return (
        <div></div>
      )
    }
  }
});

module.exports = editOutlet;
