// import {K_SCALE_NORMAL} from 'components/markers/map_marker.jsx';
// import invariant from 'fixed-data-table-ice/internal/invariant.js';

// {l: 10, scale: 0.3}, {l: 5, scale: 0.4} - означает
// 10 элементов размера 0.3, потом 5 размера 0.4, потом те что видны в табличке обычного размера
// потом снова потом 5 размера 0.4, и 10 элементов размера 0.3
// если поставить пусто то на карте будут видны тока те что на экране
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScale = getScale;
exports.getRealFromTo = getRealFromTo;
var K_SCALE_SMALL = 0.3;
var K_SCALE_MEDIUM = 0.45;
var K_BEFORE_AFTER_SCALES = [{ l: 15, scale: K_SCALE_SMALL }, { l: 10, scale: K_SCALE_MEDIUM }];
var K_SCALES_SUM = K_BEFORE_AFTER_SCALES.reduce(function (sum, el) {
  return el.l + sum;
}, 0);

function getScale(rowIndex, rowFrom, rowTo, K_SCALE_NORMAL) {
  if (rowIndex >= rowFrom && rowIndex <= rowTo) {
    return K_SCALE_NORMAL;
  }

  if (K_BEFORE_AFTER_SCALES.length) {
    if (rowIndex < rowFrom) {
      var deltaS = rowFrom;
      for (var index = K_BEFORE_AFTER_SCALES.length - 1; index >= 0; --index) {
        deltaS -= K_BEFORE_AFTER_SCALES[index].l;
        if (rowIndex >= deltaS) {
          return K_BEFORE_AFTER_SCALES[index].scale;
        }
      }

      // yes, the code can be here (dirty calculus)
      return K_BEFORE_AFTER_SCALES[0].scale;
    }

    if (rowIndex > rowTo) {
      var deltaS = rowTo;
      for (var index = K_BEFORE_AFTER_SCALES.length - 1; index >= 0; --index) {
        deltaS += K_BEFORE_AFTER_SCALES[index].l;
        if (rowIndex <= deltaS) {
          return K_BEFORE_AFTER_SCALES[index].scale;
        }
      }

      // yes, the code can be here (dirty calculus)
      return K_BEFORE_AFTER_SCALES[0].scale;
    }
  }
  return K_SCALE_NORMAL;
}

// this calculations is not precise (dirty)
function _getRealFromTo(rowFrom, rowTo, maxVisibleRows, totalSize) {
  var addFrom = rowFrom + maxVisibleRows + K_SCALES_SUM > totalSize - 1 ? rowFrom + maxVisibleRows + K_SCALES_SUM - (totalSize - 1) : 0;

  var dadd = K_SCALES_SUM - rowFrom;
  var addTo = dadd >= 0 ? dadd : 0;

  return {
    rowFrom: Math.max(0, rowFrom - K_SCALES_SUM - addFrom),
    rowTo: Math.min(totalSize - 1, rowFrom + maxVisibleRows + K_SCALES_SUM + addTo)
  };
}

function getRealFromTo(rowFrom, rowTo, maxVisibleRows, totalSize) {
  var current = _getRealFromTo(rowFrom, rowTo, maxVisibleRows, totalSize);

  var result = {
    rowFrom: current.rowFrom,
    rowTo: current.rowTo
  };

  return result;
}