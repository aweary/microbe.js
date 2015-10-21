import bugger from 'debug'
import fs from 'fs'
import final from 'finalhandler'

const debug = bugger('handler')


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

export default function handler(duplex, _router) {

  let done = final(duplex.req, duplex.res)
  let path = duplex.path

  debug('Is the duplex an asset? %o', duplex.asset)
  if (duplex.asset) return duplex.static()

  let router = _router._router
  let method = duplex.method.toLowerCase()
  let match = router.match(path)
  debug('Results: %o', match);

  if (!match) return done(false)

  let handlers = match.node[method]
  debug('Handlers: %o', handlers)
  duplex.params = match.param

  handlers.forEach(handler => handler(duplex))

}
