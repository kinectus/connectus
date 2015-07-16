var React = require('react');

var addOutlet = React.createClass({
  // getInitialState: function(){
  //   return {
  //     value: 'Enter your street address...'
  //   };
  // },
  // handleChange: function(event) {
  //   this.setState({value: event.target.value});
  // }, onChange={this.handleChange} would go in input
  // selectLog: function(val) {
  //   console.log("Selected: " + val);
  // },
  
  render: function(){
    // var value = this.state.value;
    return (
      <div className="form">
        Street <input type="text" placeholder='Enter your street address...' />
        City <input type="text" placeholder='Enter city...' /> 
        State <input type="text" placeholder='Enter state...' />
        Zip-code <input type="text" placeholder='Enter zip-code...' />
        Description <textarea name="description" placeholder="This is a description." />
        Voltage <input type="text" placeholder='Standard or High?' />
        Your hourly rate: $3/hr   Suggested price/kWh: $10
        Your price/kWh charge: $<input type="text" placeholder='10' />/kWh
      </div>
    )
  }
});

module.exports = addOutlet;

// <select className="select" onChange={this.selectLog}>
//           <option value='AK'>AK</option>
//           <option value='CA'>CA</option>
//         </select>