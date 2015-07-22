/*
 * Marker example
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactControllables = require('react-controllables');

var _reactControllables2 = _interopRequireDefault(_reactControllables);

var _reactPureRenderFunction = require('react-pure-render/function');

var _reactPureRenderFunction2 = _interopRequireDefault(_reactPureRenderFunction);

var _helpersBalloon_posJs = require('./helpers/balloon_pos.js');

var _helpersMarker_stylesJs = require('./helpers/marker_styles.js');

var K_HINT_HTML_DEFAULT_Z_INDEX = 1000000;
var K_SCALE_HOVER = 1;
var K_SCALE_TABLE_HOVER = 1;
var K_SCALE_NORMAL = 0.65;
var K_MIN_CONTRAST = 0.4;

function calcMarkerMarkerStyle(scale, zIndexStyle, markerStyle, imageStyle) {
  var contrast = K_MIN_CONTRAST + (1 - K_MIN_CONTRAST) * Math.min(scale / K_SCALE_NORMAL, 1);

  return _extends({
    transform: 'scale(' + scale + ' , ' + scale + ')',
    WebkitTransform: 'scale(' + scale + ' , ' + scale + ')',
    filter: 'contrast(' + contrast + ')',
    WebkitFilter: 'contrast(' + contrast + ')'
  }, markerStyle, zIndexStyle, imageStyle);
}

function calcMarkerTextStyle(scale, markerTextStyle) {
  var K_MAX_COLOR_VALUE = 0;
  var K_MIN_COLOR_VALUE = 8;
  var colorV = Math.ceil(K_MIN_COLOR_VALUE + (K_MAX_COLOR_VALUE - K_MIN_COLOR_VALUE) * Math.min(scale / K_SCALE_NORMAL, 1));
  var colorHex = colorV.toString(16);
  var colorHTML = '#' + colorHex + colorHex + colorHex;

  return _extends({}, markerTextStyle, {
    color: colorHTML
  });
}

exports.K_SCALE_NORMAL = K_SCALE_NORMAL;

var MapMarker = (function (_Component) {
  _inherits(MapMarker, _Component);

  _createClass(MapMarker, null, [{
    key: 'propTypes',
    value: {
      $hover: _reactAddons.PropTypes.bool,
      $dimensionKey: _reactAddons.PropTypes.any,
      $getDimensions: _reactAddons.PropTypes.func,
      $geoService: _reactAddons.PropTypes.any,
      $onMouseAllow: _reactAddons.PropTypes.func,

      marker: _reactAddons.PropTypes.any,
      hoveredAtTable: _reactAddons.PropTypes.bool,
      scale: _reactAddons.PropTypes.number,
      showBallon: _reactAddons.PropTypes.bool,
      onCloseClick: _reactAddons.PropTypes.func,
      showBallonState: _reactAddons.PropTypes.bool.isRequired,
      onShowBallonStateChange: _reactAddons.PropTypes.func.isRequired,

      // animation helpers
      hoverState: _reactAddons.PropTypes.bool.isRequired,
      onHoverStateChange: _reactAddons.PropTypes.func.isRequired,

      size: _reactAddons.PropTypes.any,
      origin: _reactAddons.PropTypes.any,
      imageClass: _reactAddons.PropTypes.string,
      image: _reactAddons.PropTypes.string,
      withText: _reactAddons.PropTypes.bool,
      hintType: _reactAddons.PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      scale: K_SCALE_NORMAL,
      hoverState: false,
      showBallonState: false,
      withText: false,
      size: { width: 62, height: 60 },
      origin: { x: 15 / 62, y: 1 },
      imageClass: 'map-marker__marker--big',
      hintType: 'hint--info'
    },
    enumerable: true
  }]);

  function MapMarker(props) {
    var _this = this;

    _classCallCheck(this, _MapMarker);

    _get(Object.getPrototypeOf(_MapMarker.prototype), 'constructor', this).call(this, props);
    this.shouldComponentUpdate = _reactPureRenderFunction2['default'];

    this._onShowBallonStateChange = function () {
      var _props;

      if (!_this.alive) return;
      (_props = _this.props).onShowBallonStateChange.apply(_props, arguments);
    };

    this._onHoverStateChange = function () {
      var _props2;

      if (!_this.alive) return;
      (_props2 = _this.props).onHoverStateChange.apply(_props2, arguments);
    };

    this._onMouseEnterContent = function () /*e*/ /*e*/{
      _this.props.$onMouseAllow(false); // disable mouse move hovers
    };

    this._onMouseLeaveContent = function () /*e*/ /*e*/{
      _this.props.$onMouseAllow(true); // enable mouse move hovers
    };

    this._onCloseClick = function () {
      if (_this.props.onCloseClick) {
        _this.props.onCloseClick();
      }
    };

    this.alive = true;
  }

  _createClass(MapMarker, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // if (this.props.onCloseClick) {
      //   this.props.onCloseClick();
      // }
      this.alive = false;
    }

    // no optimizations at all
  }, {
    key: 'render',
    value: function render() {
      // TODO add http://schema.org/docs/gs.html
      var scale = this.props.$hover || this.props.showBallon ? K_SCALE_HOVER : this.props.scale;
      scale = this.props.hoveredAtTable ? K_SCALE_TABLE_HOVER : scale;

      var markerHolderStyle = (0, _helpersMarker_stylesJs.getMarkerHolderStyle)(this.props.size, this.props.origin);
      var markerStyle = (0, _helpersMarker_stylesJs.getMarkerStyle)(this.props.size, this.props.origin);

      var zIndexStyle = {
        zIndex: Math.round(scale * 10000) - (this.props.showBallon ? 20 : 0) + (this.props.$hover ? K_HINT_HTML_DEFAULT_Z_INDEX : 0) // balloon
      };

      var textStyleDef = (0, _helpersMarker_stylesJs.getMarkerTextStyle)();
      var textStyle = calcMarkerTextStyle(scale, textStyleDef);

      var showHint = this.props.hoverState || this.props.showBallonState; // || this.props.hoveredAtTable;

      // baloon position calc
      var mapWidth = this.props.$geoService.getWidth();
      var mapHeight = this.props.$geoService.getHeight();
      var markerDim = this.props.$getDimensions(this.props.$dimensionKey);

      var hintBaloonHorizontalPosStyle = (0, _helpersBalloon_posJs.getHintBaloonHorizontalPosStyle)(markerDim.x, this.props.size.width, this.props.origin.x, mapWidth);
      var hintBaloonVerticalPosClass = (0, _helpersBalloon_posJs.getHintBaloonVerticalPosClass)(markerDim.y, mapHeight);

      var hintBalloonBottomOffsetClass = (0, _helpersBalloon_posJs.getHintBottomOffsetClass)(this.props.size.width, this.props.origin.x);

      // set baloon position at first and then animate (it must be some lib for react animations)
      var noTransClass = this.props.$hover === true && this.props.hoverState !== true ? 'hint--notrans' : '';
      var noTransBalloonClass = this.props.showBallon === true && this.props.showBallonState !== true ? 'hint--notrans' : '';

      var imageClass = this.props.image ? '' : this.props.imageClass;
      var imageStyle = this.props.image ? {
        backgroundImage: 'url(' + this.props.image + ')'
      } : null;

      var styleMarkerMarker = calcMarkerMarkerStyle(scale, zIndexStyle, markerStyle, imageStyle);

      // css hints library https://github.com/istarkov/html-hint
      return _reactAddons2['default'].createElement(
        'div',
        {
          style: markerHolderStyle,
          className: (0, _classnames2['default'])('map-marker hint hint--html', this.props.hintType, hintBalloonBottomOffsetClass, noTransClass, noTransBalloonClass, hintBaloonVerticalPosClass, this.props.showBallon ? 'hint--balloon' : '', showHint ? 'hint--always' : 'hint--hidden') },
        _reactAddons2['default'].createElement(
          'div',
          {
            style: styleMarkerMarker,
            className: (0, _classnames2['default'])('map-marker__marker', imageClass) },
          this.props.withText ? _reactAddons2['default'].createElement(
            'div',
            { style: textStyle },
            this.props.marker.get('number')
          ) : _reactAddons2['default'].createElement('div', null)
        ),
        _reactAddons2['default'].createElement(
          'div',
          {
            style: hintBaloonHorizontalPosStyle,
            className: (0, _classnames2['default'])('hint__content map-marker-hint', this.props.showBallon ? '' : 'noevents'),
            onMouseEnter: this._onMouseEnterContent,
            onMouseLeave: this._onMouseLeaveContent },
          _reactAddons2['default'].createElement(
            'div',
            {
              onClick: this._onCloseClick,
              className: (0, _classnames2['default'])('map-marker-hint__close-button', this.props.showBallon ? 'map-marker-hint__close-button--visible' : '') },
            'close'
          ),
          _reactAddons2['default'].createElement(
            'div',
            { className: "map-marker-hint__title" },
            _reactAddons2['default'].createElement(
              'strong',
              null,
              this.props.marker.get('title')
            )
          ),
          _reactAddons2['default'].createElement(
            'div',
            { className: "map-marker-hint__address" },
            this.props.marker.get('address')
          ),
          _reactAddons2['default'].createElement(
            'div',
            { className: (0, _classnames2['default'])('map-marker-hint__content', this.props.showBallon ? 'map-marker-hint__content--visible' : '') },
            this.props.marker.get('description')
          ),
          _reactAddons2['default'].createElement(
            'div',
            null,
            _reactAddons2['default'].createElement(
              'a',
              { className: (0, _classnames2['default'])('map-marker-hint__ap-link', this.props.showBallon ? 'map-marker-hint__ap-link--hidden' : '') },
              'Click to view more info'
            )
          )
        )
      );
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      var K_TRANS_DELAY = 30;

      if (prevProps.$hover !== this.props.$hover) {
        setTimeout(function () {
          return _this2._onHoverStateChange(_this2.props.$hover);
        }, K_TRANS_DELAY);
      }

      if (prevProps.showBallon !== this.props.showBallon) {
        setTimeout(function () {
          return _this2._onShowBallonStateChange(_this2.props.showBallon);
        }, K_TRANS_DELAY);
      }
    }
  }]);

  var _MapMarker = MapMarker;
  MapMarker = (0, _reactControllables2['default'])(['hoverState', 'showBallonState'])(MapMarker) || MapMarker;
  return MapMarker;
})(_reactAddons.Component);

exports['default'] = MapMarker;