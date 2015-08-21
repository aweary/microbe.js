'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _parseurl = require('parseurl');

var _parseurl2 = _interopRequireDefault(_parseurl);

var debug = (0, _debug2['default'])('request');

/**
 * Export an object that provides a public
 * interface to the internal Node request object.
 * Defines numerous getters and setters to avoid
 * direct manipulation of the HTTP request object
 *
 */

exports['default'] = Object.defineProperties({}, {
  headers: {
    get: function get() {
      return this.req.headers;
    },
    configurable: true,
    enumerable: true
  },
  url: {
    get: function get() {
      return this.req.url;
    },
    configurable: true,
    enumerable: true
  },
  method: {
    get: function get() {
      return this.req.method;
    },
    configurable: true,
    enumerable: true
  },
  path: {
    get: function get() {
      return (0, _parseurl2['default'])(this.req).pathname || '';
    },
    configurable: true,
    enumerable: true
  },
  host: {
    get: function get() {
      return (0, _parseurl2['default'])(this.req).host || '';
    },
    configurable: true,
    enumerable: true
  },
  query: {
    get: function get() {
      return (0, _parseurl2['default'])(this.req).query || '';
    },
    configurable: true,
    enumerable: true
  },
  search: {
    get: function get() {
      return (0, _parseurl2['default'])(this.req).search || '';
    },
    configurable: true,
    enumerable: true
  },
  socket: {
    get: function get() {
      return this.req.socket;
    },
    configurable: true,
    enumerable: true
  },
  asset: {
    get: function get() {
      var match = /\.(css|js|png|gif|txt|ico|xml|rss|jpeg|jpg|svg|pdf)$/;
      return match.test(this.path);
    },
    configurable: true,
    enumerable: true
  },
  params: {
    get: function get() {
      return this.params || [];
    },
    configurable: true,
    enumerable: true
  }
});
module.exports = exports['default'];