var debug = require('debug')('app:middlware')


/**
 * Register middleware handlers with routes
 * @param  {String} route      route for the middleware
 * @param  {Function} handler actual middleware handler
 */

module.exports = function(route, handler) {

  var stack = this.state.middleware

  handler === undefined
      ? stack.push({route: '*', handler: route})
      : stack.push({route: route, handler: handler})

  debug('Registered middleware on %o', route)

}
