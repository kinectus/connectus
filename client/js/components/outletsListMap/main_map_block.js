'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _reactControllables = require('react-controllables');

var _reactControllables2 = _interopRequireDefault(_reactControllables);

var _reactPureRenderFunction = require('react-pure-render/function');

var _reactPureRenderFunction2 = _interopRequireDefault(_reactPureRenderFunction);

var _googleMapReact = require('google-map-react');

var _googleMapReact2 = _interopRequireDefault(_googleMapReact);

var _marker_exampleJsx = require('./marker_example.js');

var _marker_exampleJsx2 = _interopRequireDefault(_marker_exampleJsx);

var _helpersCalc_markers_visibilityJs = require('./helpers/calc_markers_visibility.js');

var _constantsMarker_descriptionsJs = require('./constants/marker_descriptions.js');

var _constantsMarker_descriptionsJs2 = _interopRequireDefault(_constantsMarker_descriptionsJs);

var _helpersCustom_distanceJs = require('./helpers/custom_distance.js');

var _immutable = require('immutable');

var K_MARGIN_TOP = 30;
var K_MARGIN_RIGHT = 30;
var K_MARGIN_BOTTOM = 30;
var K_MARGIN_LEFT = 30;

var K_HOVER_DISTANCE = 30;

var MainMapBlock = (function (_Component) {
  _inherits(MainMapBlock, _Component);

  _createClass(MainMapBlock, null, [{
    key: 'propTypes',
    value: {
      onCenterChange: _reactAddons.PropTypes.func, // @controllable generated fn
      onZoomChange: _reactAddons.PropTypes.func, // @controllable generated fn
      onBoundsChange: _reactAddons.PropTypes.func,
      onMarkerHover: _reactAddons.PropTypes.func,
      onChildClick: _reactAddons.PropTypes.func,
      center: _reactAddons.PropTypes.any,
      zoom: _reactAddons.PropTypes.number,
      markers: _reactAddons.PropTypes.any,
      visibleRowFirst: _reactAddons.PropTypes.number,
      visibleRowLast: _reactAddons.PropTypes.number,
      maxVisibleRows: _reactAddons.PropTypes.number,
      hoveredRowIndex: _reactAddons.PropTypes.number,
      openBallonIndex: _reactAddons.PropTypes.number
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      center: new _immutable.List([59.744465, 30.042834]),
      zoom: 10,
      visibleRowFirst: -1,
      visibleRowLast: -1,
      hoveredRowIndex: -1
    },
    enumerable: true
  }]);

  function MainMapBlock(props) {
    var _this = this;

    _classCallCheck(this, _MainMapBlock);

    _get(Object.getPrototypeOf(_MainMapBlock.prototype), 'constructor', this).call(this, props);
    this.shouldComponentUpdate = _reactPureRenderFunction2['default'];

    this._onBoundsChange = function (center, zoom, bounds, marginBounds) {
      if (_this.props.onBoundsChange) {
        _this.props.onBoundsChange({ center: center, zoom: zoom, bounds: bounds, marginBounds: marginBounds });
      } else {
        _this.props.onCenterChange(center);
        _this.props.onZoomChange(zoom);
      }
    };

    this._onChildClick = function (key, childProps) {
      var markerId = childProps.marker.get('id');
      var index = _this.props.markers.findIndex(function (m) {
        return m.get('id') === markerId;
      });
      if (_this.props.onChildClick) {
        _this.props.onChildClick(index);
      }
    };

    this._onChildMouseEnter = function (key, childProps) {
      var markerId = childProps.marker.get('id');
      var index = _this.props.markers.findIndex(function (m) {
        return m.get('id') === markerId;
      });
      if (_this.props.onMarkerHover) {
        _this.props.onMarkerHover(index);
      }
    };

    this._onChildMouseLeave = function () /* key, childProps */ /* key, childProps */{
      if (_this.props.onMarkerHover) {
        _this.props.onMarkerHover(-1);
      }
    };

    this._onBalloonCloseClick = function () {
      if (_this.props.onChildClick) {
        _this.props.onChildClick(-1);
      }
    };

    this._distanceToMouse = _helpersCustom_distanceJs.customDistanceToMouse;
  }

  _createClass(MainMapBlock, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _getRealFromTo = (0, _helpersCalc_markers_visibilityJs.getRealFromTo)(this.props.visibleRowFirst, this.props.visibleRowLast, this.props.maxVisibleRows, this.props.markers.size);

      var rowFrom = _getRealFromTo.rowFrom;
      var rowTo = _getRealFromTo.rowTo;

      var Markers = this.props.markers && this.props.markers.filter(function (m, index) {
        return index >= rowFrom && index <= rowTo;
      }).map(function (marker, index) {
        return _reactAddons2['default'].createElement(_marker_exampleJsx2['default'],
        // required props
        _extends({ key: marker.get('id'),
          lat: marker.get('lat'),
          lng: marker.get('lng'),
          // any user props
          showBallon: index + rowFrom === _this2.props.openBallonIndex,
          onCloseClick: _this2._onBalloonCloseClick,
          hoveredAtTable: index + rowFrom === _this2.props.hoveredRowIndex,
          scale: (0, _helpersCalc_markers_visibilityJs.getScale)(index + rowFrom, _this2.props.visibleRowFirst, _this2.props.visibleRowLast, _marker_exampleJsx.K_SCALE_NORMAL)
        }, _constantsMarker_descriptionsJs2['default'][marker.get('type')], {
          marker: marker }));
      });

      return _reactAddons2['default'].createElement(
        _googleMapReact2['default'],

        // apiKey={null}
        { center: this.props.center.toJS(),
          zoom: this.props.zoom,
          onBoundsChange: this._onBoundsChange,
          onChildClick: this._onChildClick,
          onChildMouseEnter: this._onChildMouseEnter,
          onChildMouseLeave: this._onChildMouseLeave,
          margin: [K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT],
          hoverDistance: K_HOVER_DISTANCE,
          distanceToMouse: this._distanceToMouse
        },
        Markers
      );
    }
  }]);

  var _MainMapBlock = MainMapBlock;
  MainMapBlock = (0, _reactControllables2['default'])(['center', 'zoom', 'markers'])(MainMapBlock) || MainMapBlock;
  return MainMapBlock;
})(_reactAddons.Component);

exports['default'] = MainMapBlock;
module.exports = exports['default'];