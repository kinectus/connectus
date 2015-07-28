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
            <div className="banner"><span className="charge-anything">Charge anything</span> <span className="anywhere">anywhere.</span></div>
          </div>
        </div>
          <div className="section howitworks">
            <div className="container">
  	          <div className='row'>
                <div className="col-md-4">
                  <h3><span className="column-headers">Sell your electricity.</span></h3>
                </div>
                <div className="col-md-4">
                  <h3><span className="column-headers">Find power near you.</span></h3>
                </div>
                <div className="col-md-4">
                  <h3><span className="column-headers">Keep it green.</span></h3>
                </div>
              </div>
            </div>
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