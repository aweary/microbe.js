'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _proto = require('./proto');

var _proto2 = _interopRequireDefault(_proto);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var debug = (0, _debug2['default'])('app:index');

exports['default'] = function (opts) {

  var app = Object.create(_proto2['default']);
  var state = new _state2['default']();
  app.state = (0, _merge2['default'])(state, opts);
  return app;
};

module.exports = exports['default'];