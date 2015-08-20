'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _routerJs = require('../../router.js');

var _routerJs2 = _interopRequireDefault(_routerJs);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var debug = (0, _debug2['default'])('app:route');

/**
 * proto.route
 * @param  {String} path base location for route
 * @param  {Object} router  Microbe router object
 * @summary used to set the routes for the Microbe proto
 */

exports['default'] = function (path, router) {

  /* Cache the path no matter what */
  this.state.routes.push(path);
  debug('Registering route %o', path);

  /* If a function is passed, treat it as a basic GET route */
  if (typeof router === 'function') {

    var routeObject = (0, _routerJs2['default'])(path).get(router);
    this.state.routers[path] = routeObject;
    return true;
  }

  /* If an object is passed, assume it is a Router object */
  else if (typeof router === 'object') {
      this.state.routers[path] = router;
      return true;
    }

    /* If no route handler is passed, assume the user wants to chain routes*/
    else if (!router) {
        var routeObject = (0, _routerJs2['default'])(path);
        this.state.routers[path] = routeObject;
        return routeObject;
      }
};

module.exports = exports['default'];