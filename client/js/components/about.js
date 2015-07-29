//Page that users first see - explains the mission statement of CONNECTUS
//Should end up being similar to zipcar's homepage where users can scroll down
var React = require('react');
var Link = require('react-router').Link;
// var ReactAddons = require('react/addons');

var About = React.createClass({

  componentDidMount: function() {
    $('.phone').popover({
      trigger: 'hover',
      placement: 'right',
      html: true,
      content: $('.phoneInfo').html()
    })

    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    })

    $('.auth').popover({
      trigger: 'hover',
      placement: 'left'
    })
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
                  <span className="column-headers"><h3>Sell your electricity.</h3></span>
                  <ul>
                    <li>Post your outlet&#39;s availability online</li>
                    <li>Earn money when people plug in</li>
                    <li>Join a network of other sellers</li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <span className="column-headers"><h3>Find power near you.</h3></span>
                  <ul>
                    <li>Find outlets in your area</li>
                    <li>Reserve an outlet and plug in</li>
                    <li>See your power usage in real-time</li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <span className="column-headers"><h3>Keep it green.</h3></span>
                  <ul>
                    <li>Supplies electricity to replace diesel generators</li>
                    <li>Supports easy charging of electric cars</li>
                    <li>Facilitates sharing power in developing areas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="section energyInfo">
            <span className="our-stack"><h2>How it works</h2></span>
		        <div className="diagram">
              <table>
                <tr className="diagram-row">
                  <td className="diagram-data"><span className="instructions">Hover over items in the tech stack to see what they do!</span></td>
                  <td className="diagram-data database" data-toggle="popover" title="Database" data-content="MySQL with Bookshelf.js ORM"></td>
                  <td className="diagram-data"></td>
                </tr>
                <tr className="diagram-row">
                  <td className="diagram-data"></td>
                  <td className="diagram-data"></td>
                  <td className="diagram-data"></td>
                </tr>
                <tr className="diagram-row">
                  <td className="diagram-data"></td>
                  <td className="diagram-data connectus-server" data-toggle="popover" title="Connect.us Server" data-content="Node.js and Express"></td>
                  <td className="diagram-data auth" data-toggle="popover" title="Secure Outlet-Server Communication" data-content="The Connect.us Server communicates with a Node.js server running on top of the hardware"></td>
                </tr>
                <tr className="diagram-row">
                  <td className="diagram-data"></td>
                  <td className="diagram-data"></td>
                  <td className="diagram-data"></td>
                </tr>
                <tr className="diagram-row">
                  <td className="diagram-data phone" data-toggle="popover" title="Web application" data-content="React and Flux with Bootstrap"></td>
                  <td className="diagram-data"></td>
                  <td className="diagram-data"></td>
                </tr>
                <tr className="diagram-row">
                  <td className="diagram-data"></td>
                  <td className="diagram-data"></td>
                  <td className="diagram-data"></td>
                </tr>
              </table>
            </div>
          </div>
      </div>
    );
  }

});

module.exports = About;