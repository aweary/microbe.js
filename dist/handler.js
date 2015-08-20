'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _params = require('./params');

var _params2 = _interopRequireDefault(_params);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _finalhandler = require('finalhandler');

var _finalhandler2 = _interopRequireDefault(_finalhandler);

var debug = (0, _debug2['default'])('handler');

exports['default'] = function (request, response, app) {

  var routers = app.state.routers;
  var done = (0, _finalhandler2['default'])(request, response);
  var stack = app.state.middleware;
  var path = request.path;
  var type = request.type;
  var params = app.state.routeParamters;

  var matched = false;

  if (request.staticRequest) {
    debug('Rendering static file: %o', path);
    return response['static'](path);
  }

  debug('Requested view: %o', path);

  Object.keys(routers).forEach(function (route) {

    var router = routers[route];
    debug('router.params: %o', router.params);

    if (router.matchPath.test(path)) {

      matched = true;
      var matches = router.matchPath.exec(path);
      debug('!!!!Params: %o, matches: %o', router.params, matches);

      (0, _params2['default'])(request, router.params, matches);

      if (stack.length) {
        stack.forEach(function (middleware) {
          var handler = middleware.handler;
          var route = middleware.route;
          if (route === path || route === '*') handler(request, response);
        });
      }
      /* Handle the actual request now */
      router.handlers[type](request, response);
      return true;
    }
  });

  if (!matched) done(matched);
};

module.exports = exports['default'];