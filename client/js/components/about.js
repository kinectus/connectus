//Page that users first see - explains the mission statement of CONNECTUS
//Should end up being similar to zipcar's homepage where users can scroll down
var React = require('react');
var Link = require('react-router').Link;
// var ReactAddons = require('react/addons');

var About = React.createClass({
  render: function(){
    return (
  	  <div className="about">
        <div className="">
	        <div className="section info">
	          <div className="ui container">
	            <h1>Get to Know Us</h1>
		          <div className="ui button"><Link to="signup">Sign Up</Link></div>
			        <h2>This is why you should join CONNECTUS</h2>
            </div>
          </div>
          <div className="section howitworks">
            <div className="ui container">
		          <h1>How does Connectus work?</h1>
			        <h2>Diagram of our process</h2>
            </div>
          </div>
          <div className="section energyInfo">
            <div className="ui container">
		          <h1>What energy looks like today</h1>
			        <h2>This is how Connectus plays into the bigger picture</h2>
            </div>
          </div>
          
        </div>
      </div>
    );
  }

});

module.exports = About;