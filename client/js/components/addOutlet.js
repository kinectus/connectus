var React = require('react');
var outletStore = require('../stores/outletStore');

/* TODO
Style page
Change state and voltage to dropdown

*/

var addOutlet = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    var newOutlet = {
      address: React.findDOMNode(this.name.street).value.trim() + ';' + React.findDOMNode(this.refs.city).value.trim() + ';' +  React.findDOMNode(this.refs.state).value.trim() + ';' + React.findDOMNode(this.refs.zip).value.trim(),
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
    
    React.findDOMNode(this.name.street).value = '';
    React.findDOMNode(this.name.city).value = '';
    React.findDOMNode(this.name.state).value = '';
    React.findDOMNode(this.name.zip).value = '';
    React.findDOMNode(this.name.name).value = '';
    React.findDOMNode(this.name.description).value = '';
    React.findDOMNode(this.name.voltage).value = '';
    React.findDOMNode(this.name.charge).value = '';
    console.log('submitted!')
    return;
  },
  render: function(){
    // var value = this.state.value;
    return (
      <div className="addoutlet ui container center">
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Street</label>
            <input type="text" name="street" placeholder='Enter your street address...' /><br />
          </div>
          <div className="field">
            City <input type="text" name="city" placeholder='Enter city...' /> <br />
          </div>
          <div className="field">
            State <input type="text" name="state" placeholder='Enter state...' /><br />
          </div>
          <div className="field">
            Zip-code <input type="text" name="zip" placeholder='Enter zip-code...' /><br />
          </div>
          <div className="field">
            Name <input type="text" name="name" placeholder='What do you want to call this outlet?' /><br />
          </div>
          <div className="field">
            Description <textarea name="description" name="description" placeholder="This is a description." /><br />
          </div>
          <div className="field">
            <label>Voltage</label>
            <select className="ui dropdown">
              <option value="1">Standard</option>
              <option value="0">High</option>
            </select><br />
          </div>
          <div className="field">
            Your hourly rate: $3/hr   Suggested price/kWh: $10/kWh<br />
          </div>
          <div className="field">
            Your price/kWh charge: $<input type="text" name="charge" placeholder='ex. 10' />/kWh<br />
          </div>
          <div className="ui submit button" type="POST">Submit</div><br />
        </form>
      </div>
    )
  }
});

module.exports = addOutlet;

// <select className="select" onChange={this.selectLog}>
//           <option value='AK'>AK</option>
//           <option value='CA'>CA</option>
//         </select>