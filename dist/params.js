'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var debug = (0, _debug2['default'])('params');

exports['default'] = function (request, params, matches) {

  request.params = {};
  var values = Object.keys(matches).map(function (key) {
    return matches[key];
  }).slice(1, -2);
  debug('Values %o', values);

  params.forEach(function (param, index) {
    var name = param.name;
    request.params[name] = values[index];
  });
};

module.exports = exports['default'];