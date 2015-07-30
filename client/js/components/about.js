//Page that users first see - explains the mission statement of CONNECTUS
//Should end up being similar to zipcar's homepage where users can scroll down
var React = require('react');
var Link = require('react-router').Link;
var mobileCheck = require('./mobileCheck')
// var ReactAddons = require('react/addons');

var About = React.createClass({

  componentDidMount: function() {
    var stop = true;

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

    $(window).scroll(function(){
      console.log('THEY SEE ME SCROLLIN...')
      stop = false;
      if($(this).scrollTop() > 100 && stop === false) {
        $('.banner-item').fadeIn(2000, 'swing')
          .animate({
            opacity: 1,
            left: '+= 30'
          }, {
            duration: '2000',
            easing: 'swing',
            queue: false
        })
      }
    })
  },

  render: function(){
    if (!mobileCheck()){
      console.log('rendering FULL')
      return (
    	  <div className="about">
          <div className="header-about">
            <div className="header-text">
              <div className="banner"><span className="charge-anything">Charge anything</span> <span className="anywhere">anywhere.</span></div>
            </div>
          </div>
            <div className="section howitworks">
              <div className="container">
                <div className='landscape-banner'>
                  <div className='row'>
                    <div className='banner-item col-md-4 outlet'></div>
                    <div className='banner-item col-md-4 location'></div>
                    <div className='banner-item col-md-4 trees'></div>
                  </div>
                </div>
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
              <span className="our-stack"><h2>Hover to explore how it works.</h2></span>
  		        <div className="diagram">
                <table>
                  <tr className="diagram-row">
                    <td className="diagram-data"></td>
                    <td className="diagram-data database" data-toggle="popover" title="Database" data-content="MySQL with Bookshelf.js ORM"></td>
                    <td className="diagram-data"></td>
                    <td className="diagram-data"></td>
                  </tr>
                  <tr className="diagram-row">
                    <td className="diagram-data"></td>
                    <td className="diagram-data"></td>
                    <td className="diagram-data"></td>
                    <td className="diagram-data"></td>
                  </tr>
                  <tr className="diagram-row">
                    <td className="diagram-data"></td>
                    <td className="diagram-data connectus-server" data-toggle="popover" title="Connect.us Server" data-content="Node.js and Express"></td>
                    <td className="diagram-data auth" data-toggle="popover" title="Secure Outlet-Server Communication" data-content="The Connect.us Server communicates with a Node.js server running on top of the hardware"></td>
                    <td className="diagram-data"></td>
                  </tr>
                  <tr className="diagram-row">
                    <td className="diagram-data"></td>
                    <td className="diagram-data phone" data-toggle="popover" title="Web application" data-content="React and Flux with Bootstrap"></td>
                    <td className="diagram-data"></td>
                    <td className="diagram-data"></td>
                  </tr>
                  <tr className="diagram-row">
                    <td className="diagram-data"></td>
                    <td className="diagram-data"></td>
                    <td className="diagram-data power-server" data-toggle="popover" title="Power Server" data-content="Node.js communicating with the outlet through shell.js bash commands"></td>
                    <td className="diagram-data"></td>
                  </tr>
                  <tr className="diagram-row">
                    <td className="diagram-data"></td>
                    <td className="diagram-data"></td>
                    <td className="diagram-data outlet" data-toggle="popover" title="Smart Outlet" data-content="Can send power data and turn off/on with Ruby app"></td>
                    <td className="diagram-data"></td>
                  </tr>
                  <tr className="diagram-row">
                    <td className="diagram-data"></td>
                    <td className="diagram-data food-truck" data-toggle="popover" title="Users" data-content="Once outlet is on, users can start charging!"></td>
                    <td className="diagram-data"></td>
                    <td className="diagram-data"></td>
                  </tr>
                </table>
              </div>
            </div>
        </div>
      );
    } else {
        console.log('rendering MOBILE')
          return (
            <div className="about">
              <div className="header-about">
                <div className="header-text-mobile">
                  <div className="banner-mobile"><span className="charge-anything-mobile">Charge anything</span> <span className="anywhere-mobile">anywhere.</span></div>
                </div>
              </div>
                <div className="section howitworks">
                  <div className="container">
                    <div className='row'>
                      <div className="col-md-4">
                        <div className='banner-item-mobile col-md-4 outlet-mobile'></div>
                        <span className="column-headers-mobile"><h3>Sell your electricity.</h3></span>
                          <span className="mobile-points"><h2>Post your outlet&#39;s availability online</h2></span>
                          <span className="mobile-points"><h2>Earn money when people plug in</h2></span>
                          <span className="mobile-points"><h2>Join a network of other sellers</h2></span>
                      </div>
                      <div className="col-md-4">
                        <div className='banner-item-mobile col-md-4 location-mobile'></div>
                        <span className="column-headers-mobile"><h3>Find power near you.</h3></span>
                          <span className="mobile-points"><h2>Find outlets in your area</h2></span>
                          <span className="mobile-points"><h2>Reserve an outlet and plug in</h2></span>
                          <span className="mobile-points"><h2>See your power usage in real-time</h2></span>
                      </div>
                      <div className="col-md-4">
                        <div className='banner-item-mobile col-md-4 trees-mobile'></div>
                        <span className="column-headers-mobile"><h3>Keep it green.</h3></span>
                          <span className="mobile-points"><h2>Supplies electricity to replace diesel generators</h2></span>
                          <span className="mobile-points"><h2>Supports easy charging of electric cars</h2></span>
                          <span className="mobile-points"><h2>Facilitates sharing power in developing areas</h2></span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          )
    }
  }

});

module.exports = About;