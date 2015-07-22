"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customDistanceToMouse = customDistanceToMouse;

function customDistanceToMouse(pt, mousePos, markerProps) {
  var K_SCALE_NORMAL = 0.65;

  var K_MARKER_HEIGHT = 60;
  // marker is more tall at top, so calc distance to some point at marker top
  var K_MARKER_WEIGHT_PT = K_MARKER_HEIGHT * 0.7;
  // distance to markers depends on scale so hover on big markers is more probable
  var scale = markerProps.scale;
  var x = pt.x;
  var y = pt.y - K_MARKER_WEIGHT_PT * scale;

  var scaleNormalized = Math.min(scale / K_SCALE_NORMAL, 1);
  var K_MIN_DIST_MIN_KOEF = 0.6;

  var distKoef = 1 + scaleNormalized * (K_MIN_DIST_MIN_KOEF - 1);
  return distKoef * Math.sqrt((x - mousePos.x) * (x - mousePos.x) + (y - mousePos.y) * (y - mousePos.y));
}