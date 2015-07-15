//Page that users first see - explains the mission statement of CONNECTUS
//Should end up being similar to zipcar's homepage where users can scroll down
var React = require('react');

var About = React.createClass({
  render: function(){
    return (
  	  <div className="about centered ui container">
        <h1>Get to Know Us</h1>
        <h1>This is why you should join CONNECTUS</h1>
      </div>
    );
  }

});

module.exports = About;