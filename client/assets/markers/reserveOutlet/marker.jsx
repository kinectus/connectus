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

var _reactPureRenderFunction = require('react-pure-render/function');

var _reactPureRenderFunction2 = _interopRequireDefault(_reactPureRenderFunction);

var _my_great_place_with_hover_stylesJs = require('./markerStyle.js');

var MyGreatPlaceWithStick = (function (_Component) {
  _inherits(MyGreatPlaceWithStick, _Component);

  _createClass(MyGreatPlaceWithStick, null, [{
    key: 'propTypes',
    value: {
      // GoogleMap pass $hover props to hovered components
      // to detect hover it uses internal mechanism, explained in x_distance_hover example
      $hover: _reactAddons.PropTypes.bool,
      text: _reactAddons.PropTypes.string,
      zIndex: _reactAddons.PropTypes.number
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {},
    enumerable: true
  }]);

  function MyGreatPlaceWithStick(props) {
    _classCallCheck(this, MyGreatPlaceWithStick);

    _get(Object.getPrototypeOf(MyGreatPlaceWithStick.prototype), 'constructor', this).call(this, props);
    this.shouldComponentUpdate = _reactPureRenderFunction2['default'];
  }

  _createClass(MyGreatPlaceWithStick, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var text = _props.text;
      var zIndex = _props.zIndex;

      var style = _extends({}, _my_great_place_with_hover_stylesJs.greatPlaceStyle, {
        zIndex: this.props.$hover ? 1000 : zIndex
      });

      var circleStyle = this.props.$hover ? _my_great_place_with_hover_stylesJs.greatPlaceCircleStyleHover : _my_great_place_with_hover_stylesJs.greatPlaceCircleStyle;
      var stickStyle = this.props.$hover ? _my_great_place_with_hover_stylesJs.greatPlaceStickStyleHover : _my_great_place_with_hover_stylesJs.greatPlaceStickStyle;

      return _reactAddons2['default'].createElement(
        'div',
        { style: style },
        _reactAddons2['default'].createElement('div', { style: _my_great_place_with_hover_stylesJs.greatPlaceStickStyleShadow }),
        _reactAddons2['default'].createElement(
          'div',
          { style: circleStyle },
          text
        ),
        _reactAddons2['default'].createElement('div', { style: stickStyle })
      );
    }
  }]);

  return MyGreatPlaceWithStick;
})(_reactAddons.Component);

exports['default'] = MyGreatPlaceWithStick;
module.exports = exports['default'];