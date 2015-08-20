'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _finalhandler = require('finalhandler');

var _finalhandler2 = _interopRequireDefault(_finalhandler);

var _consolidate = require('consolidate');

var _consolidate2 = _interopRequireDefault(_consolidate);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _utilHelpers = require('./util/helpers');

var debug = (0, _debug2['default'])('response');

exports['default'] = function (request, response, app) {

  var done = (0, _finalhandler2['default'])(request, response);
  var send = (0, _utilHelpers.serve)(response, done);

  response.render = (0, _utilHelpers.lib)('response', 'render')(app, send);
  response['static'] = (0, _utilHelpers.lib)('response', 'static')(app, send);
  response.json = (0, _utilHelpers.lib)('response', 'json')(response, done);
};

module.exports = exports['default'];