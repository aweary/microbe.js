'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _response = require('./response');

var _response2 = _interopRequireDefault(_response);

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

var _handler = require('./handler');

var _handler2 = _interopRequireDefault(_handler);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

exports['default'] = function (port, app) {

  var debug = (0, _debug2['default'])('app:server');
  debug('Starting app with port %o', port);

  return _http2['default'].createServer(function (req, res) {

    var ctx = {};
    ctx.request = Object.create(_request2['default']);
    ctx.request.req = req;
    debug('Request object created: %o', [ctx.request.url, ctx.request.query, ctx.request.asset]);
    res.end('404');

    // /* Augment response object for view rendering */
    // responsify(request, response, app)
    //
    // /* Pass off request and response for route handling */
    // handler(request, response, app)
  });
};

module.exports = exports['default'];