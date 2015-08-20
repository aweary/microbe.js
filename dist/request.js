'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var debug = (0, _debug2['default'])('request');

exports['default'] = function (request, response, app) {

  debug('requested url: %o', request.url);

  var staticMatch = /\.(css|js|png|gif|txt|ico|xml|rss|jpeg|jpg|svg|pdf)$/;
  request.path = _url2['default'].parse(request.url).pathname;
  request.type = request.method.toString().toLowerCase();

  if (staticMatch.test(request.path)) {
    request.staticRequest = true;
  }
};

module.exports = exports['default'];