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
    // var value = this.state.value;
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          Street <input type="text" ref="street" placeholder='Enter your street address...' />
          City <input type="text" ref="city" placeholder='Enter city...' /> 
          State <input type="text" ref="state" placeholder='Enter state...' />
          Zip-code <input type="text" ref="zip" placeholder='Enter zip-code...' />
          Name <input type="text" ref="name" placeholder='What do you want to call this outlet?' />
          Description <textarea name="description" ref="description" placeholder="This is a description." />
          Voltage <input type="text" ref="voltage" placeholder='Standard or High?' />
          Your hourly rate: $3/hr   Suggested price/kWh: $10/kWh
          Your price/kWh charge: $<input type="text" ref="charge" placeholder='10' />/kWh
          <input type="submit" value="Post" />
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