var React = require('react');
/* TODO
Send values to database as new outlet
Style page
Change state and voltage to dropdown

*/

var addOutlet = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var street = React.findDOMNode(this.refs.street).value.trim();
    var city = React.findDOMNode(this.refs.city).value.trim();
    var state = React.findDOMNode(this.refs.state).value.trim();
    var zip = React.findDOMNode(this.refs.zip).value.trim();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var description = React.findDOMNode(this.refs.description).value.trim();
    var voltage = React.findDOMNode(this.refs.voltage).value.trim();
    var charge = React.findDOMNode(this.refs.charge).value.trim();
    console.log(street, city, state, zip, description, voltage, charge);
    // if (!text || !author) {
    //   return;
    // }
    // TODO: send request to the server
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