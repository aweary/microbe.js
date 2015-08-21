import paramify from './params'
import bugger from 'debug'
import fs from 'fs'
import final from 'finalhandler'

const debug = bugger('handler')

export default function(duplex) {

  const routers = duplex.routers
  const done = final(duplex.req, duplex.res)
  const stack = duplex.middleware
  const path   = duplex.path
  const method   = duplex.method.toLowerCase()
  const params = duplex.routeParamters

  let matched = false

  if (duplex.asset) {
    debug('Rendering static file: %o', path)
    // return duplex.static()
  }

  debug('Requested view: %o', path)

  Object.keys(routers).forEach((route) => {

    const router = routers[route]
    debug('router.params: %o', router.params)

    if (router.matchPath.test(path)) {

      matched = true
      const matches = router.matchPath.exec(path)
      // paramify(request, router.params, matches)


      if (stack.length) {
        stack.forEach(function(middleware) {
          const handler = middleware.handler
          const route = middleware.route
          if (route === path || route === '*') handler(duplex)
        })

      }
      debug('Handler: %o, method: %o', router.handlers, method)
      /* Handle the actual request now */
      router.handlers[method](duplex)
      return true
    }

  })

  if (!matched) done(matched)

}
