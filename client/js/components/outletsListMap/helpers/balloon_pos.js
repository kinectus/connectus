'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getHintBaloonVerticalPosClass = getHintBaloonVerticalPosClass;
exports.getHintBaloonHorizontalPosStyle = getHintBaloonHorizontalPosStyle;
exports.getHintBottomOffsetClass = getHintBottomOffsetClass;

function getHintBaloonVerticalPosClass(y /*, mapHeight*/) {
  var K_MAX_BALLOON_HEIGHT = 240;
  return y > K_MAX_BALLOON_HEIGHT ? 'hint--top' : 'hint--bottom';
}

function getHintBaloonHorizontalPosStyle(x, markerWidth, markerOffset, mapWidth) {
  var K_BALLOON_WIDTH_BASE = 250;
  // offset from map side
  var K_BALLOON_MAP_OFFSET = 10;
  // balloon with not more than map width
  var K_BALLOON_WIDTH = Math.min(K_BALLOON_WIDTH_BASE, mapWidth - 2 * K_BALLOON_MAP_OFFSET);
  // default ballon offset from arrow center i want
  var K_BALLOON_DEFAULT_OFFSET = K_BALLOON_WIDTH * 0.15;
  // from corner
  var offset = -K_BALLOON_DEFAULT_OFFSET + markerWidth * 0.5;
  // overflow in px (marker assymetric)
  var leftX = x + offset - markerWidth * markerOffset;
  var rightX = leftX + K_BALLOON_WIDTH;
  // recalc if overflow
  var mapOffset = offset + Math.min(0, mapWidth - K_BALLOON_MAP_OFFSET - rightX) + Math.max(0, K_BALLOON_MAP_OFFSET - leftX);

  var K_BALLOON_WIDTH_STYLE = {
    width: K_BALLOON_WIDTH + 'px',
    left: mapOffset + 'px',
    marginLeft: '0px'
  };
  return K_BALLOON_WIDTH_STYLE;
}

function getHintBottomOffsetClass(markerWidth, markerOffset) {
  var K_HINT_ARROW_WIDTH = 12;
  var offset = Math.round(-(markerWidth / 2 + K_HINT_ARROW_WIDTH / 2 - markerOffset * markerWidth));
  if (__DEV__) {
    if (offset < -40 || offset > 40) {
      console.error('HintBottomOffset is out of range, extend range at sass/markers/map_marker.sass'); // eslint-disable-line no-console
    }
  }
  // classes generated at sass/markers/map_marker.sass
  return 'map-marker--hint-bottom-delta-' + offset;
}