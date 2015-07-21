'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var K_CIRCLE_SIZE = 30;
var K_STICK_SIZE = 10;
var K_STICK_WIDTH = 3;

var greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_CIRCLE_SIZE,
  height: K_CIRCLE_SIZE + K_STICK_SIZE,
  left: -K_CIRCLE_SIZE / 2,
  top: -(K_CIRCLE_SIZE + K_STICK_SIZE)
};

var greatPlaceCircleStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: K_CIRCLE_SIZE,
  height: K_CIRCLE_SIZE,
  border: '3px solid #f44336',
  borderRadius: K_CIRCLE_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 12,
  fontWeight: 'bold',
  padding: 0,
  cursor: 'pointer',
  boxShadow: '0 0 0 1px white'
};

var greatPlaceCircleStyleHover = _extends({}, greatPlaceCircleStyle, {
  border: '3px solid #3f51b5',
  color: '#f44336'
});

var greatPlaceStickStyleShadow = {
  position: 'absolute',
  left: K_CIRCLE_SIZE / 2 - K_STICK_WIDTH / 2,
  top: K_CIRCLE_SIZE,
  width: K_STICK_WIDTH,
  height: K_STICK_SIZE,
  backgroundColor: '#f44336',
  boxShadow: '0 0 0 1px white'
};

var greatPlaceStickStyle = {
  position: 'absolute',
  left: K_CIRCLE_SIZE / 2 - K_STICK_WIDTH / 2,
  top: K_CIRCLE_SIZE,
  width: K_STICK_WIDTH,
  height: K_STICK_SIZE,
  backgroundColor: '#f44336'
};

var greatPlaceStickStyleHover = _extends({}, greatPlaceStickStyle, {
  backgroundColor: '#3f51b5'
});

exports.greatPlaceStyle = greatPlaceStyle;
exports.greatPlaceCircleStyle = greatPlaceCircleStyle;
exports.greatPlaceCircleStyleHover = greatPlaceCircleStyleHover;
exports.greatPlaceStickStyle = greatPlaceStickStyle;
exports.greatPlaceStickStyleHover = greatPlaceStickStyleHover;
exports.greatPlaceStickStyleShadow = greatPlaceStickStyleShadow;
exports.K_CIRCLE_SIZE = K_CIRCLE_SIZE;
exports.K_STICK_SIZE = K_STICK_SIZE;