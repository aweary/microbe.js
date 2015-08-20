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

exports['default'] = function (port, app) {

  return _http2['default'].createServer(function (request, response) {

    /* Augment response object for view rendering */
    (0, _response2['default'])(request, response, app);
    /* Augument request object for route handling */
    (0, _request2['default'])(request, response, app);
    /* Pass off request and response for route handling */
    (0, _handler2['default'])(request, response, app);
  });
};

module.exports = exports['default'];