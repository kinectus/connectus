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
    // var value = this.state.value;
    return (
      <div className="addoutlet ui container center">
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Street</label>
            <input type="text" name="street" ref="street" placeholder='Enter your street address...' /><br />
          </div>
          <div className="field">
            City <input type="text" name="city" ref="city" placeholder='Enter city...' /> <br />
          </div>
          <div className="field">
            State <input type="text" name="state" ref="state" placeholder='Enter state...' /><br />
          </div>
          <div className="field">
            Zip-code <input type="text" name="zip" ref="zip" placeholder='Enter zip-code...' /><br />
          </div>
          <div className="field">
            Name <input type="text" name="name" ref="name" placeholder='What do you want to call this outlet?' /><br />
          </div>
          <div className="field">
            Description <textarea name="description" name="description" ref="description" placeholder="This is a description." /><br />
          </div>
          <div className="field">
            <label>Voltage</label>
            <select className="ui dropdown" ref="voltage">
              <option value="standard">Standard</option>
              <option value="high">High</option>
            </select><br />
          </div>
          <div className="field">
            Your hourly rate: $3/hr   Suggested price/kWh: $10/kWh<br />
          </div>
          <div className="field">
            Your price/kWh charge: $<input type="text" name="charge" ref="charge" placeholder='ex. 10' />/kWh<br />
          </div>
          <input type="submit" value="Submit" />
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