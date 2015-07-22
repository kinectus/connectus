
var React = require('react');
var outletStore = require('../stores/outletStore');
<<<<<<< HEAD
=======
var userStore = require('../stores/userStore');
>>>>>>> outletListMap
var ReactAddons = require('react/addons');
var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var Link = require('react-router').Link;
var Router = require('react-router'); //need this for redirection
var mobile = require('./mobilecheck');
<<<<<<< HEAD
var GoogleMap = require('google-map-react');


var outletsList = React.createClass({

  getInitialState: function(){
    return {
      data: []
    }
  },

  mixins: [Router.Navigation], //makes the router navigation information available for use (need this for redirection)

  // reserveOutlet: function(id){
  //   ConnectusDispatcher.dispatch({
  //       action: 'CLICK_OUTLET',
  //       id: id
  //   });
  // },

  componentDidMount: function() {
    var that = this;
    console.log('component mounted')
    outletStore.getOutlets().then(function(outletData){
      that.setState({data: outletData});
      $('.ui.rating').rating();
    });
  },

  render: function() {

    // is the user authenticated?
    if(!document.cookie){
      this.transitionTo('login');
      return <h1></h1>;
    }

    var isMobile = mobile();
    if (isMobile) {
      console.log('MOBILE')
    }

    var that = this;
    // outlet data list
    if (this.state.data.length !==0) {
      if(isMobile) {
        var outletHtml = this.state.data.map(function(outlet) {
          return (
            <tr key={outlet.id} onClick={that.reserveOutlet}>
              <td>
                <h2 className="ui center aligned header"> 
                  <Link to="reserveOutlet" params={{id: outlet.id }}>
                    { outlet.name } 
                  </Link>
                </h2>
              </td>
              <td>
                <h5>Seller:</h5> 
                <p className="description-text">Bob Belcher</p>
              </td>
              <td>
                <p className="description-text"><div className="ui star rating" data-rating={ outlet.rating } data-max-rating={ outlet.rating }></div></p>
              </td>
              <td>
                <h5>Voltage:</h5> 
                <p className="description-text">{ outlet.voltage }</p>
              </td>
              <td>
                <h5>Pricing: </h5>
                <p className="description-text">Price by hour: { outlet.priceHourly }</p>
                <p className="description-text">Price by kWh: { outlet.priceEnergy }</p>
              </td>
              <td>
                <h5>Description:</h5> 
                <p className="description-text">{ outlet.description }</p>
              </td>
            </tr>
          )
        });
      } else {
        var outletHtml = this.state.data.map(function(outlet) {
          return (
            <tr key={outlet.id} onClick={that.reserveOutlet}>
              <td>
                <h2 className="ui center aligned header"> 
                  <Link to="reserveOutlet" params={{id: outlet.id }}>
                    { outlet.name } 
                  </Link>
                </h2>
              </td>
              <td>
                Seller: { outlet.seller }
              </td>
              <td>
                <div className="ui star rating" data-rating={ outlet.rating } data-max-rating={ outlet.rating }>{ outlet.rating }</div>
              </td>
              <td>
                { outlet.voltage }
              </td>
              <td>
                Price by hour: { outlet.priceHourly }
                Price by kWh: { outlet.priceEnergy }
              </td>
              <td>
              { outlet.description }
              </td>
            </tr>
          )
        });
      }
    }

    if(isMobile) {
      var tableHead = (
        <table className="ui selectable celled padded table">
        <tbody>
          { outletHtml }
        </tbody>
      </table>
      )
    } else {
      var tableHead = (
        <table className="ui selectable celled padded table">
          <thead>
            <tr><th className="single line">Outlet Name</th>
            <th>Seller</th>
            <th>Rating</th>
            <th>Voltage</th>
            <th>Price</th>
            <th>Description</th>
          </tr></thead>
        <tbody>
          { outletHtml }
        </tbody>
      </table>
      )
    }
    // includes search bar, map/list button and possibly filter/sort buttons
    
    //onClick={this.handleSubmit}
    var listMenu = (
      <div>
        <div className="ui button"> map</div> 
        <div className="ui input">
          <input type="text" placeholder="Search..."> </input>
        </div>
      </div>
    );

      return (
        <div className="outletsList container">
          {tableHead}
        </div>
    )
    // });  from the promise closing
  },

  _onChange: function() {
    this.setState(this.getInitialState());
  }

});

module.exports = outletsList;
=======

var shouldPureComponentUpdate = require('react-pure-render/function');
var MainMapLayout =require('./outletsListMap/main_map_layout.js');
var MainMapBlock =require('./outletsListMap/main_map_block.js');
// var IceTable = require('components/controls/fixed_table_examples/ice_table.js');
var Redux = require('redux');
var ReduxReact = require('redux/react');
_actionsMap_actionsJs = require('./outletsListMap/actions/map_actions.js')



// var outletsListMap = React.createClass({

  // getInitialState: function(){
  //   return {
  //     data: []
  //   }
  // },

  // mixins: [Router.Navigation], //makes the router navigation information available for use (need this for redirection)

  // componentDidMount: function() {
  //   var that = this;
  //   outletStore.getOutlets().then(function(outletData){
  //     // $('.ui.rating').rating();
  //       outletData.map(function(outlet){
  //         userStore.getUsernameById(outlet.id).then(function(user){
  //           console.log(user.username)
  //           outlet['seller'] = user.username;
  //           that.setState({data: outletData});
  //           // $('.ui.rating').rating();
  //         })
  //       })
  //   });
  // },

  // render: function() {

  //   // is the user authenticated?
  //   if(!document.cookie){
  //     this.transitionTo('login');
  //     return <h1></h1>;
  //   }

  //   var that = this;

  //   return 
  // },

  // _onChange: function() {
  //   this.setState(this.getInitialState());
  // }
// });
// 
// module.exports = outletsListMap;


'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _reactAddons = require('react/addons');
var _reactAddons2 = _interopRequireDefault(_reactAddons);
var _reactPureRenderFunction = require('react-pure-render/function');
var _reactPureRenderFunction2 = _interopRequireDefault(_reactPureRenderFunction);
var _main_map_layoutJsx = require('./outletsListMap/main_map_layout.js');
var _main_map_layoutJsx2 = _interopRequireDefault(_main_map_layoutJsx);
// var _componentsControlsFixed_table_examplesIce_tableJsx = require('components/controls/fixed_table_examples/ice_table.jsx');
// var _componentsControlsFixed_table_examplesIce_tableJsx2 = _interopRequireDefault(_componentsControlsFixed_table_examplesIce_tableJsx);
var _main_map_blockJsx = require('./outletsListMap/main_map_block.js');
var _main_map_blockJsx2 = _interopRequireDefault(_main_map_blockJsx);
var _reduxReact = require('redux/react');
var _redux = require('redux');
var _actionsMap_actionsJs = require('./outletsListMap/actions/map_actions.js');
// slice actions to support map and table interfaces


var allMapActions = _interopRequireWildcard(_actionsMap_actionsJs);

var mapActions = (function (_ref) {
  var onBoundsChange = _ref.changeBounds;
  var onMarkerHover = _ref.markerHoverIndexChange;
  var onChildClick = _ref.showBallon;
  return {
    onBoundsChange: onBoundsChange, onMarkerHover: onMarkerHover, onChildClick: onChildClick
  };
})(allMapActions);

var tableActions = (function (_ref2) {
  var onHoveredRowIndexChange = _ref2.tableHoveredRowIndexChange;
  var onVisibleRowsChange = _ref2.tableVisibleRowsChange;
  var onRowClick = _ref2.showBallon;
  return {
    onHoveredRowIndexChange: onHoveredRowIndexChange, onVisibleRowsChange: onVisibleRowsChange, onRowClick: onRowClick
  };
})(allMapActions);

var MainMapPage = (function (_Component) {
  _inherits(MainMapPage, _Component);

  _createClass(MainMapPage, null, [{
    key: 'propTypes',
    value: {
      layout: _reactAddons.PropTypes.string
    },
    enumerable: true
  }]);

  function MainMapPage(props) {
    _classCallCheck(this, MainMapPage);

    _get(Object.getPrototypeOf(MainMapPage.prototype), 'constructor', this).call(this, props);
    this.shouldComponentUpdate = _reactPureRenderFunction2['default'];
  }

  _createClass(MainMapPage, [{
    key: '_renderMap',
    value: function _renderMap() {
      return _reactAddons2['default'].createElement(
        _reduxReact.Connector,
        { select: function (state) {
            return {
              center: state.map.get('mapInfo').get('center'),
              zoom: state.map.get('mapInfo').get('zoom'),
              markers: state.map.get('dataFiltered'),
              visibleRowFirst: state.map.get('tableRowsInfo').get('visibleRowFirst'),
              visibleRowLast: state.map.get('tableRowsInfo').get('visibleRowLast'),
              maxVisibleRows: state.map.get('tableRowsInfo').get('maxVisibleRows'),
              hoveredRowIndex: state.map.get('tableRowsInfo').get('hoveredRowIndex'),
              openBallonIndex: state.map.get('openBalloonIndex')
            };
          } },
        function (_ref3) {
          var dispatch = _ref3.dispatch;

          var mapProps = _objectWithoutProperties(_ref3, ['dispatch']);

          return _reactAddons2['default'].createElement(_main_map_blockJsx2['default'], _extends({}, mapProps, (0, _redux.bindActionCreators)(mapActions, dispatch)));
        }
      );
    }
  },  {
    key: 'render',
    value: function render() {
      return _reactAddons2['default'].createElement(_main_map_layoutJsx2['default'], { layout: this.props.layout, renderMap: this._renderMap });
    }
  }]);

  return MainMapPage;
})(_reactAddons.Component);

exports['default'] = MainMapPage;
module.exports = exports['default'];
>>>>>>> outletListMap
