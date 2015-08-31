'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = Router;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _routington = require('routington');

var _routington2 = _interopRequireDefault(_routington);

var _methods = require('methods');

var _methods2 = _interopRequireDefault(_methods);

var _events = require('events');

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function Router() {
  this._router = (0, _routington2['default'])();
}

_methods2['default'].forEach(function (method) {

  Router.prototype[method] = function (path, handler) {
    var node = this._router.define(path)[0];
    node[method] = node[method] || [];
    node[method].push(handler);
  };
});
module.exports = exports['default'];