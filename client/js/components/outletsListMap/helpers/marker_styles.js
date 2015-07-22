'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getMarkerHolderStyle = getMarkerHolderStyle;
exports.getMarkerStyle = getMarkerStyle;
exports.getMarkerTextStyle = getMarkerTextStyle;

function getMarkerHolderStyle(size, origin) {
  var left = -size.width * origin.x;
  var top = -size.height * origin.y;
  return {
    position: 'absolute',
    width: size.width,
    height: size.height,
    left: left,
    top: top,
    cursor: 'pointer'
  };
}

function getMarkerStyle(size, origin) {
  var sizeOriginX = size.width * origin.x;
  var sizeOriginY = size.height * origin.y;

  return {
    position: 'absolute',
    width: size.width,
    height: size.height,
    left: 0,
    top: 0,
    willChange: 'transform', // it looks like this setting make firefox random marker movements smaller
    backgroundSize: size.width + 'px ' + size.height + 'px',
    backgroundRepeat: 'no-repeat',
    // transition: 'transform 0.25s ease',
    transition: 'transform 0.25s cubic-bezier(0.485, 1.650, 0.545, 0.835)',
    WebkitTransition: '-webkit-transform 0.25s cubic-bezier(0.485, 1.650, 0.545, 0.835)',
    transformOrigin: sizeOriginX + 'px ' + sizeOriginY + 'px',
    WebkitTransformOrigin: sizeOriginX + 'px ' + sizeOriginY + 'px'
  };
}

var textStyle_ = {
  width: '100%',
  textAlign: 'center',
  marginTop: 10,
  fontWeight: 'bold',
  fontSize: '18px',
  color: 'black'
};

function getMarkerTextStyle() {
  return textStyle_;
}