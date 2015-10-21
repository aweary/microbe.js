'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = handler;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _finalhandler = require('finalhandler');

var _finalhandler2 = _interopRequireDefault(_finalhandler);

var debug = (0, _debug2['default'])('handler');

/**
 * Takes the duplex req/res object and attempts to
 * match its path against the routington router. If a
 * match is found the handlers for the method type are
 * invoked in order.
 *
 * If no match is found the request is ended with a
 * 404 error.
 *
 * @param  {Object} duplex  req/res object
 * @param  {Object} _router routington instance
 */

function handler(duplex, _router) {

  var done = (0, _finalhandler2['default'])(duplex.req, duplex.res);
  var path = duplex.path;

  debug('Is the duplex an asset? %o', duplex.asset);
  if (duplex.asset) return duplex['static']();

  var router = _router._router;
  var method = duplex.method.toLowerCase();
  var match = router.match(path);
  debug('Results: %o', match);

  if (!match) return done(false);

  var handlers = match.node[method];
  debug('Handlers: %o', handlers);
  duplex.params = match.param;

  handlers.forEach(function (handler) {
    return handler(duplex);
  });
}

module.exports = exports['default'];