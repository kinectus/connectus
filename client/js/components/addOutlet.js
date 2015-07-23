var React = require('react');
var outletStore = require('../stores/outletStore');
// var ReactAddons = require('react/addons');

/* TODO
Style page
Change state and voltage to dropdown

*/

var addOutlet = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    var newOutlet = {
      address: React.findDOMNode(this.refs.street).value.trim() + ';' + React.findDOMNode(this.refs.city).value.trim() + ';' +  React.findDOMNode(this.refs.state).value.trim() + ';' + React.findDOMNode(this.refs.zip).value.trim(),
      name: React.findDOMNode(this.refs.name).value.trim(),
      description: React.findDOMNode(this.refs.description).value.trim(),
      voltage: React.findDOMNode(this.refs.voltage).value.trim(),
      charge: React.findDOMNode(this.refs.charge).value.trim()
    };

    console.log(newOutlet);
    // if (!text || !author) {
    //   return;
    // }
    outletStore.submitOutlet(newOutlet).then(function(res){
      console.log('ADDOUTLET submit response: ', res)
    });
    
    React.findDOMNode(this.refs.street).value = '';
    React.findDOMNode(this.refs.city).value = '';
    React.findDOMNode(this.refs.state).value = '';
    React.findDOMNode(this.refs.zip).value = '';
    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.description).value = '';
    React.findDOMNode(this.refs.voltage).value = '';
    React.findDOMNode(this.refs.charge).value = '';
    console.log('submitted!')
    return;
  },
  render: function(){
    // is user authenticated
    if(!document.cookie){
      this.transitionTo('login');
      return <h1></h1>;
    }

    return (
      <div className="addoutlet col-md-6 col-md-offset-3">
        <h3>Add an outlet:</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Street</label><br />
            <input type="text" name="street" ref="street" className="form-control" placeholder='Enter your street address...' /><br />
          </div>
          <div className="form-group">
            <label>City</label><br />
            <input type="text" name="city" ref="city" className="form-control" placeholder='Enter city...' /> <br />
          </div>
          <div className="form-group">
            <label>State</label><br />
            <input type="text" name="state" ref="state" className="form-control" placeholder='Enter state...' /><br />
          </div>
          <div className="form-group">
            <label>Zip Code</label><br />
            <input type="text" name="zip" ref="zip" className="form-control" placeholder='Enter zip-code...' /><br />
          </div>
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
          <button type="submit" className="btn btn-primary btn-lg btn-block" value="Submit">Submit</button>
        </form>
      </div>
    )
  }
});

module.exports = addOutlet;


// <div className="ui submit button" type="POST">Submit</div><br />

// <select className="select" onChange={this.selectLog}>
//           <option value='AK'>AK</option>
//           <option value='CA'>CA</option>
//         </select>