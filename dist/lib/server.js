'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _delegates = require('delegates');

var _delegates2 = _interopRequireDefault(_delegates);

var _finalhandler = require('finalhandler');

var _finalhandler2 = _interopRequireDefault(_finalhandler);

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _awearyExcept = require('@aweary/except');

var _awearyExcept2 = _interopRequireDefault(_awearyExcept);

var _response2 = require('./response');

var _response3 = _interopRequireDefault(_response2);

var _request2 = require('./request');

var _request3 = _interopRequireDefault(_request2);

var _handler = require('./handler');

var _handler2 = _interopRequireDefault(_handler);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _utilConstants = require('./util/constants');

var _utilHelpers = require('./util/helpers');

exports['default'] = function (port, app) {

  var debug = (0, _debug2['default'])('app:server');
  debug('Starting app with port %o', port);

  return _http2['default'].createServer(function (req, res) {

    _request3['default'].req = req;
    _response3['default'].res = res;
    app.emit('request', { req: req });

    var duplex = (0, _merge2['default'])(_request3['default'], _response3['default']);
    duplex.app = app;
    var router = app.router;
    duplex.done = (0, _finalhandler2['default'])(req, res);
    duplex.send = (0, _utilHelpers.serve)(res, duplex.done);
    (0, _handler2['default'])(duplex, router);
  });
};

module.exports = exports['default'];