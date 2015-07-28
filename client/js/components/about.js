//Page that users first see - explains the mission statement of CONNECTUS
//Should end up being similar to zipcar's homepage where users can scroll down
var React = require('react');
var Link = require('react-router').Link;
// var ReactAddons = require('react/addons');

var About = React.createClass({

  componentDidMount: function() {
  },

  render: function(){
    return (
  	  <div className="about">
        <div className="header-about">
          <div className="header-text">
            <div className="banner"><span>Charge anything anywhere.</span></div>
          </div>
        </div>
          <div className="section howitworks">
		          <h1>How does Connectus work?</h1>
			        <h2>Diagram of our process</h2>
          </div>
          <div className="section energyInfo">
		          <h1>What energy looks like today</h1>
			        <h2>This is how Connectus plays into the bigger picture</h2>
          </div>
      </div>
    );
  }

});

module.exports = About;