'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = genMarkersData;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _immutable = require('immutable');

// really really nice but big size library

var _immutable2 = _interopRequireDefault(_immutable);

var _fakerVendorMersenneJs = require('faker/vendor/mersenne.js');

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var K_PITER_LAT_LNG = { lat: 59.938043, lng: 30.337157 };

function imageRndUrl() {
  var width = arguments.length <= 0 || arguments[0] === undefined ? 100 : arguments[0];
  var height = arguments.length <= 1 || arguments[1] === undefined ? 75 : arguments[1];

  var categories = ['abstract', 'animals', 'business', 'cats', 'city', 'food', 'nightlife', 'fashion', 'people', 'nature', 'sports', 'technics', 'transport'];
  var category = categories[_faker2['default'].random.number({ max: categories.length - 1 })];
  var index = 1 + _faker2['default'].random.number({ max: 8 });
  return 'http://lorempixel.com/' + width + '/' + height + '/' + category + '/' + index + '/';
}

// something like normal distribution around 0.5
function nLikeRnd() {
  var K_N = 10;
  var sum = 0;
  for (var i = 0; i < K_N; ++i) {
    sum += _faker2['default'].random.number({ max: 1, precision: 0.0001 });
  }

  return sum / K_N;
}

function genMarkersData(_ref) {
  var count = _ref.count;
  var seedNumber = _ref.seed;
  var latVarM = _ref.latVarM;
  var lngVarM = _ref.lngVarM;
  var test = _ref.test;
  var typeGetter = _ref.typeGetter;

  (0, _fakerVendorMersenneJs.seed)(seedNumber);
  var K_P_COUNT = 10;
  var paragraphs = new _immutable2['default'].Range(0, K_P_COUNT).map(function () {
    return _faker2['default'].lorem.paragraph();
  }).toList().toJS();

  var markersData = new _immutable2['default'].Range(0, count).map(function (i) {
    return new _immutable2['default'].Map({
      id: 'uuid_' + i,
      lat: K_PITER_LAT_LNG.lat + (latVarM || 1.5) * (nLikeRnd() - 0.5),
      lng: K_PITER_LAT_LNG.lng + (lngVarM || 1.5) * (nLikeRnd() - 0.5),
      title: _faker2['default'].company.companyName().toUpperCase(),
      description: paragraphs[i % K_P_COUNT],
      address: _faker2['default'].address.streetAddress(),
      image: imageRndUrl(),
      type: typeGetter ? typeGetter(i) : i % 2, // i % 4,
      number: 20 + i + '$'
    });
  }).toList(); // we need List not Seq

  if (test) {
    markersData = markersData.push(new _immutable2['default'].Map({ // this marker i use to test positioning https://www.dropbox.com/s/oybq1nvogjfstlj/Screenshot%202015-05-06%2017.46.32.png?dl=0
      id: 'red selo',
      lat: 59.724465,
      lng: 30.080121,
      title: 'KRASNOYE SELO CIRCLE',
      description: 'circle',
      address: 'circle',
      image: imageRndUrl(),
      type: 0,
      number: '500$'
    })).push(new _immutable2['default'].Map({
      id: 'alaska',
      lat: 65.670915,
      lng: -153.093992,
      title: 'ALASKA',
      description: 'alaska',
      address: 'alaska',
      image: imageRndUrl(),
      type: 0,
      number: '501$'
    }));
  }

  return markersData;
}

module.exports = exports['default'];