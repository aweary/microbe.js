import Router from '../../router.js'
import bugger from 'debug'

const debug = bugger('app:route')

/**
 * proto.route
 * @param  {String} path base location for route
 * @param  {Object} router  Microbe router object
 * @summary used to set the routes for the Microbe proto
 */

export default function(path, handler) {

  let routers = this.state.routers
  this.state.routes.push(path)

  debug('Registering route %o', path)

  switch (typeof handler) {

    case 'function':
      debug('Registered function for %o', path)
      let router = Router(path, handler, 'GET')
      routers.push(router)
      return

    case 'object':
      handler.path = path
      routers.push(handler)
      return

    case 'undefined':
      routers.push(Router(path))
      return router

    default:
    /* noop */

  }


}
