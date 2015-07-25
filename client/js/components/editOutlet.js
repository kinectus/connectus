var React = require('react');
var outletStore = require('../stores/outletStore');
var Alert = require('react-bootstrap').Alert;

/* TODO
Style page
Change state and voltage to dropdown

*/

var editOutlet = React.createClass({
  getInitialState: function(){
   return {
      data: [],
      alert: false
    }
  },
  // mixins: [Router.Navigation],

  componentDidMount: function() {
    var that = this;
    var outletID = this.props.params.id;
    console.log('OUTLET ID: ', outletID)
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

  handleSubmit: function(e) {
    e.preventDefault();

    var newOutlet = {
      id: this.state.outlet.id,
      seller_id: this.state.seller_id,
      address: React.findDOMNode(this.refs.street).value.trim() + ';' + React.findDOMNode(this.refs.city).value.trim() + ';' +  React.findDOMNode(this.refs.state).value.trim() + ';' + React.findDOMNode(this.refs.zip).value.trim(),
      name: React.findDOMNode(this.refs.name).value.trim(),
      description: React.findDOMNode(this.refs.description).value.trim(),
      voltage: React.findDOMNode(this.refs.voltage).value.trim(),
      charge: React.findDOMNode(this.refs.charge).value.trim()
    };

    var same = true;
    console.log('newOutlet: ', newOutlet);
    console.log('state outlet: ', this.state.outlet)
    for (key in newOutlet){
      if (key === 'charge' && newOutlet[key] !== this.state.outlet.priceEnergy.toString()){
        same = false;
      } else if (key !== 'charge' && newOutlet[key] !== this.state.outlet[key]){
        same = false;
      }
    }
    console.log('same? ', same);

    outletStore.editOutlet(newOutlet).then(function(res){
      console.log('editOutlet submit response: ', res)
    });
    
    // POPUP confirmation: updated
    // redirect to their outlet list

  },

  confirm: function(e){
    e.preventDefault();
    this.setState({alert: true});
  },

  hideMe: function(e){
    e.preventDefault();
    this.setState({alert: false});
  },

  render: function(){
    // is user authenticated
    if(!document.cookie){
      this.transitionTo('login');
      return <h1></h1>;
    }
    if (this.state.zip){
      var outlet = this.state.outlet;
      var hidden = !this.state.alert ? "hidden" : "notHidden";
      var buttonHid = !this.state.alert ? "notHidden btn btn-primary btn-lg btn-block" : "hidden btn btn-primary btn-lg btn-block";
      return (
        <div className="editOutlet col-md-6 col-md-offset-3">
          <h3>Add an outlet:</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Street</label><br />
              <input type="text" name="street" ref="street" className="form-control" defaultValue={this.state.street} /><br />
            </div>
            <div className="form-group">
              <label>City</label><br />
              <input type="text" name="city" ref="city" className="form-control" defaultValue={this.state.city} /> <br />
            </div>
            <div className="form-group">
              <label>State</label><br />
              <input type="text" name="state" ref="state" className="form-control" defaultValue={this.state.state} /><br />
            </div>
            <div className="form-group">
              <label>Zip Code</label><br />
              <input type="text" name="zip" ref="zip" className="form-control" defaultValue={this.state.zip} /><br />
            </div>
            <div className="form-group">
              <label>Outlet Name</label><br />
              <input type="text" name="name" ref="name" className="form-control" defaultValue={outlet.name}/><br />
            </div>
            <div className="form-group">
              <label>Instructions for user</label><br />
              <textarea name="description" name="description" ref="description" className="form-control" defaultValue={outlet.description} /><br />
            </div>
            <div className="form-group">
              <label>Outlet Voltage</label><br />
              <select className="ui dropdown" className="form-control" ref="voltage" defaultValue={outlet.voltage}>
                <option value="standard">Standard</option>
                <option value="high">High</option>
              </select><br />
            </div>
            <div className="form-group">
              <label>Your hourly rate: $3/hr   Suggested price/kWh: $0.20/kWh</label><br />
            </div>
            <div className="form-group">
              <label>Your price/kWh charge: </label><br />
              <input type="text" name="charge" ref="charge" className="form-control" defaultValue={outlet.priceEnergy} />/kWh<br />
            </div>
            <Alert className={hidden} bsStyle="info" onDismiss={this.handleAlertDismiss}>
              <h4 className="text-center">Update information on {outlet.name}?</h4>
              <div className="text-center">
                <button type="submit" className="btn btn-default confirming">Update</button>
                <button onClick={this.hideMe} className="btn btn-default confirming">Cancel</button>
              </div>
            </Alert>
            <button className={buttonHid} onClick={this.confirm} >Submit</button>
          </form>
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
