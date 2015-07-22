'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _reactPureRenderFunction = require('react-pure-render/function');

var _reactPureRenderFunction2 = _interopRequireDefault(_reactPureRenderFunction);

var _componentsControlsPure_rendererPure_rendererJsx = require('./controls/pure_renderer.js');

var _componentsControlsPure_rendererPure_rendererJsx2 = _interopRequireDefault(_componentsControlsPure_rendererPure_rendererJsx);

var MainMapLayout = (function (_Component) {
  _inherits(MainMapLayout, _Component);

  _createClass(MainMapLayout, null, [{
    key: 'propTypes',
    value: {
      renderMap: _reactAddons.PropTypes.func,
      renderTable: _reactAddons.PropTypes.func,
      layout: _reactAddons.PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      layout: 'left'
    },
    enumerable: true
  }]);

  function MainMapLayout(props) {
    _classCallCheck(this, MainMapLayout);

    _get(Object.getPrototypeOf(MainMapLayout.prototype), 'constructor', this).call(this, props);
    this.shouldComponentUpdate = _reactPureRenderFunction2['default'];
  }

  _createClass(MainMapLayout, [{
    key: 'render',
    value: function render() {
      if (this.props.layout === 'left') {
        return _reactAddons2['default'].createElement(
          'div',
          { style: { height: '100%', position: 'relative', overflow: 'hidden' } },
          _reactAddons2['default'].createElement(
            'div',
            { style: { position: 'absolute', left: 0, top: 0, width: '62%', height: '100%' } },
            _reactAddons2['default'].createElement(_componentsControlsPure_rendererPure_rendererJsx2['default'], { render: this.props.renderMap })
          ),
          _reactAddons2['default'].createElement(
            'div',
            { style: { position: 'absolute', right: 0, top: 0, width: '38%', height: '100%' } },
            _reactAddons2['default'].createElement(_componentsControlsPure_rendererPure_rendererJsx2['default'], { render: this.props.renderTable })
          )
        );
      }

      return _reactAddons2['default'].createElement(
        'div',
        { style: { height: '100%', position: 'relative', overflow: 'hidden' } },
        _reactAddons2['default'].createElement(
          'div',
          { style: { position: 'absolute', left: 0, top: 0, width: '38%', height: '100%' } },
          _reactAddons2['default'].createElement(_componentsControlsPure_rendererPure_rendererJsx2['default'], { render: this.props.renderTable })
        ),
        _reactAddons2['default'].createElement(
          'div',
          { style: { position: 'absolute', right: 0, top: 0, width: '62%', height: '100%' } },
          _reactAddons2['default'].createElement(_componentsControlsPure_rendererPure_rendererJsx2['default'], { render: this.props.renderMap })
        )
      );
    }
  }]);

  return MainMapLayout;
})(_reactAddons.Component);

exports['default'] = MainMapLayout;
module.exports = exports['default'];