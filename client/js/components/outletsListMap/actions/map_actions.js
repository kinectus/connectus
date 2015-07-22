'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.query = query;
exports.changeBounds = changeBounds;
exports.tableVisibleRowsChange = tableVisibleRowsChange;
exports.tableHoveredRowIndexChange = tableHoveredRowIndexChange;
exports.markerHoverIndexChange = markerHoverIndexChange;
exports.showBallon = showBallon;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _createDecoratedObject(descriptors) { var target = {}; for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = true; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } } if (descriptor.initializer) { descriptor.value = descriptor.initializer.call(target); } Object.defineProperty(target, key, descriptor); } return target; }

var _asyncDecorators = require('async-decorators');

var _constsMap_actions_typesJs = require('./consts/map_actions_types.js');

var _componentsExamplesDataGen_markers_dataJs = require('./data/gen_markers_data.js');

// to emulate server async call

var _componentsExamplesDataGen_markers_dataJs2 = _interopRequireDefault(_componentsExamplesDataGen_markers_dataJs);

var getDataAsync = function getDataAsync() {
  var ms = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  return new Promise(function (r) {
    return setTimeout(function () {
      return r(data);
    }, ms);
  });
};

var K_EMUL_ROUNDTRIP_TIME_MS = 130;
var K_ROW_DEBOUNCE_INTERVAL = 16; // increase if you wanna show really big amount of markers

var asyncActions = _createDecoratedObject([{
  key: 'query',
  decorators: [(0, _asyncDecorators.memoize)({ expireMs: 1000 * 60 * 15 }), (0, _asyncDecorators.serialize)({ raiseSkipError: false })],
  value: function query(params) {
    return regeneratorRuntime.async(function query$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(getDataAsync(K_EMUL_ROUNDTRIP_TIME_MS, (0, _componentsExamplesDataGen_markers_dataJs2['default'])(params)));

        case 2:
          return context$1$0.abrupt('return', context$1$0.sent);

        case 3:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  }
}, {
  key: 'tableVisibleRowsChange',
  decorators: [(0, _asyncDecorators.serialize)({ raiseSkipError: false })],
  // skips all but first and last
  value: function tableVisibleRowsChange(_ref) {
    var visibleRowFirst = _ref.visibleRowFirst;
    var visibleRowLast = _ref.visibleRowLast;
    var maxVisibleRows = _ref.maxVisibleRows;
    return regeneratorRuntime.async(function tableVisibleRowsChange$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(getDataAsync(K_ROW_DEBOUNCE_INTERVAL, { visibleRowFirst: visibleRowFirst, visibleRowLast: visibleRowLast, maxVisibleRows: maxVisibleRows }));

        case 2:
          return context$1$0.abrupt('return', context$1$0.sent);

        case 3:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  }
}]);

function query(params) {
  return {
    types: [null, _constsMap_actions_typesJs.QUERY_MAP, null],
    promise: asyncActions.query(params).then(function (data) {
      return { markersData: data };
    })
  };
}

function changeBounds(_ref2) {
  var center = _ref2.center;
  var zoom = _ref2.zoom;
  var bounds = _ref2.bounds;
  var marginBounds = _ref2.marginBounds;

  return { type: _constsMap_actions_typesJs.CHANGE_BOUNDS_MAP,
    center: center, zoom: zoom, bounds: bounds, marginBounds: marginBounds };
}

function tableVisibleRowsChange(params) {
  return {
    types: [null, _constsMap_actions_typesJs.TABLE_VISIBLE_ROWS_CHANGE_MAP, null],
    promise: asyncActions.tableVisibleRowsChange(params)
  };
}

function tableHoveredRowIndexChange(hoveredRowIndex) {
  return {
    type: _constsMap_actions_typesJs.TABLE_HOVERED_ROWS_INDEX_CHANGE_MAP,
    hoveredRowIndex: hoveredRowIndex
  };
}

function markerHoverIndexChange(hoverMarkerIndex) {
  return {
    type: _constsMap_actions_typesJs.MARKER_HOVER_INDEX_CHANGE_MAP,
    hoverMarkerIndex: hoverMarkerIndex
  };
}

function showBallon(openBalloonIndex) {
  return {
    type: _constsMap_actions_typesJs.SHOW_BALLON_MAP,
    openBalloonIndex: openBalloonIndex
  };
}

// possible memory leak, check