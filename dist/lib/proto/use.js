'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var debug = (0, _debug2['default'])('app:middlware');

/**
 * Register middleware handlers with routes
 * @param  {String} route      route for the middleware
 * @param  {Function} handler actual middleware handler
 */

exports['default'] = function (route, handler) {

  var stack = this.state.middleware;

  handler === undefined ? stack.push({ route: '*', handler: route }) : stack.push({ route: route, handler: handler });

  debug('Registered middleware on %o', route);
};

module.exports = exports['default'];