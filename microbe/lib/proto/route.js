var Router = require('../../router.js')
var debug = require('debug')('app:route')

/**
 * proto.route
 * @param  {String} path base location for route
 * @param  {Object} router  Microbe router object
 * @summary used to set the routes for the Microbe proto
 */

module.exports = function(path, router) {

  /* Cache the path no matter what */
  this.state.routes.push(path)
  debug('Registering route %o', path)

  /* If a function is passed, treat it as a basic GET route */
  if (typeof router === 'function') {

    var routeObject = Router(path).get(router)
    this.state.routers[path] = routeObject
    return true
  }

  /* If an object is passed, assume it is a Router object */
  else if (typeof router === 'object') {
    this.state.routers[path] = router
    return true
  }

  /* If no route handler is passed, assume the user wants to chain routes*/
  else if (!router) {
    var routeObject = Router(path)
    this.state.routers[path] = routeObject
    return routeObject
  }

}
