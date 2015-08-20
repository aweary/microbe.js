import bugger from 'debug'
const debug = bugger('app:middlware')


/**
 * Register middleware handlers with routes
 * @param  {String} route      route for the middleware
 * @param  {Function} handler actual middleware handler
 */

export default function(route, handler) {

  let stack = this.state.middleware

  handler === undefined
      ? stack.push({route: '*', handler: route})
      : stack.push({route: route, handler: handler})

  debug('Registered middleware on %o', route)

}
