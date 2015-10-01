var React = require('react');
var Link = require('react-router').Link;
var mobileCheck = require('./mobilecheck');
var AuthConstants = require('../constants/authConstants.js');
var FooterCheck = require('./footerCheck');

//Page that users first see - explains the mission statement of CONNECTUS

var About = React.createClass({

  componentDidMount: function() {
    var stop = true;

    $('.left-hover').popover({
      trigger: 'hover',
      placement: 'left'
    });

    $('.right-hover').popover({
      trigger: 'hover',
      placement: 'right'
    });

    $('.top-hover').popover({
      trigger: 'hover',
      placement: 'top'
    });

    $('.bottom-hover').popover({
      trigger: 'hover',
      placement: 'bottom'
    });

    $(window).scroll(function(){
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

    FooterCheck.checker();

  },

  render: function(){
    var authHtml = (
        <div>
          <div className="col-sm-6 col-sm-offset-3 authBox">
            <div className="btn btn-lg">
              <div className="outlet"></div>
              <a href={AuthConstants.FACEBOOK}>
                Plug in with Facebook
              </a>
            </div>
          </div>
        </div>
      );

    var authHtmlMobile = (
        <div>
          <div className="col-sm-6 col-sm-offset-3 authBoxMobile">
            <div className="btn btn-lg">
            <a href={AuthConstants.FACEBOOK}>
              Plug in with Facebook
            </a>
            </div>
          </div>
        </div>
      );
    

    if(document.cookie){
      var authHtml = <h1></h1>;
    }
    
    if (!mobileCheck()){
      console.log('rendering FULL')
      return (
    	  <div className="about">
          <div className="header-about">
            <div className="header-text">
              <div className="banner"><span className="charge-anything">Charge anything</span> <span className="anywhere">anywhere.</span></div>
            </div>
            {authHtml}
          </div>
            <div className="section howitworks">
              <div className="container-fluid">
                <div className='landscape-banner'>
                  <div className='row'>
                    <div className='banner-item col-md-4 outlet'></div>
                    <div className='banner-item col-md-4 location'></div>
                    <div className='banner-item col-md-4 trees'></div>
                  </div>
                </div>
      	          <div className='row'>
                    <div className="col-md-4">
                      <img src="../assets/img/outlet.png"></img>
                      <span className="column-headers"><h3>Sell your electricity.</h3></span>
                      <ul className="feature-list">
                        <li>Use our smart outlet to become a seller</li>
                        <li>Post your outlet&#39;s availability online</li>
                        <li>Earn money when people plug in</li>
                      </ul>
                    </div>
                  <div className="col-md-4">
                    <img src="../assets/img/location.png"></img>
                    <span className="column-headers"><h3>Find power near you.</h3></span>
                      <ul className="feature-list">
                        <li>Find outlets in your area</li>
                        <li>Reserve an outlet and plug in</li>
                        <li>See your power usage in real-time</li>
                      </ul>
                  </div>
                  <div className="col-md-4">
                    <img src="../assets/img/trees.png"></img>
                    <span className="column-headers center-img"><h3>Keep it green.</h3></span>
                    <ul className="feature-list">
                      <li>Supplies electricity to replace diesel generators</li>
                      <li>Supports easy charging of electric vehicles</li>
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
                    <td className="diagram-data40"></td>
                    <td className="diagram-data20 database right-hover" data-toggle="popover" title="Database" data-content="MySQL with Bookshelf.js ORM"></td>
                    <td className="diagram-data40"></td>
                  </tr>
                  <tr className="diagram-row40"></tr>
                </table>
                <table>
                  <tr className="diagram-row150">
                    <td className="diagram-data40"></td>
                    <td className="diagram-data20 connectus-server bottom-hover" data-toggle="popover" title="Connect.us Server" data-content="Node.js and Express. Sockets.io for streaming real-time power information."></td>
                    <td className="diagram-data10 auth right-hover" data-toggle="popover" title="Secure Outlet-Server Communication" data-content="The Connect.us Server communicates with a Node.js server running on top of the hardware"></td>
                    <td className="diagram-data30"></td>
                  </tr>
                </table>
                <table>
                  <tr className="diagram-row120">
                    <td className="diagram-data20"></td>
                    <td className="diagram-data20 left-hover" data-toggle="popover" title="Web application" data-content="React and Flux with Bootstrap"></td>
                    <td className="diagram-data20"></td>
                    <td className="diagram-data20 power-server right-hover" data-toggle="popover" title="Power Server" data-content="Node.js communicates with the smart outlet through shell.js bash commands"></td>
                    <td className="diagram-data20"></td>
                  </tr>
                </table>
                <table>
                  <tr className="diagram-row220">
                    <td className="diagram-data30"></td>
                    <td className="diagram-data30 food-truck left-hover" data-toggle="popover" title="Users" data-content="Once outlet is on, users can start charging!"></td>
                    <td className="diagram-data20 outlet right-hover" data-toggle="popover" title="Smart Outlet" data-content="Can send real-time power data and be turned off/on with Ruby app"></td>
                    <td className="diagram-data20"></td>
                  </tr>
                </table>
                <table>
                  <tr className="diagram-row120">
                    <td className="diagram-data"></td>
                    <td className="diagram-data"></td>
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
                {authHtmlMobile}
              </div>
                <div className="section howitworks">
                  <div className="container">
                    <div className='row'>
                      <div className="col-md-4">
                        <div className='banner-item-mobile col-md-4 outlet-mobile'></div>
                        <span className="column-headers-mobile"><h3>Sell your electricity.</h3></span>
                          <span className="mobile-points"><h2>Use our smart outlet to become a seller</h2></span>
                          <span className="mobile-points"><h2>Post your outlet&#39;s availability online</h2></span>
                          <span className="mobile-points"><h2>Earn money when people plug in</h2></span>
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
                          <span className="mobile-points"><h2>Supports easy charging of electric vehicles</h2></span>
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
