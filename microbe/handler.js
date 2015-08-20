import paramify from './params'
import bugger from 'debug'
import fs from 'fs'
import final from 'finalhandler'

const debug = bugger('handler')

export default function(request, response, app) {

  const routers = app.state.routers
  const done = final(request, response)
  const stack = app.state.middleware
  const path   = request.path
  const type   = request.type
  const params = app.state.routeParamters

  let matched = false

  if (request.staticRequest) {
    debug('Rendering static file: %o', path)
    return response.static(path)
  }

  debug('Requested view: %o', path)

  Object.keys(routers).forEach((route) => {

    const router = routers[route]
    debug('router.params: %o', router.params)

    if (router.matchPath.test(path)) {

      matched = true
      const matches = router.matchPath.exec(path)
      paramify(request, router.params, matches)


      if (stack.length) {
        stack.forEach(function(middleware) {
          const handler = middleware.handler
          const route = middleware.route
          if (route === path || route === '*') handler(request, response)
        })

      }
      /* Handle the actual request now */
      router.handlers[type](request, response)
      return true
    }

  })

  if (!matched) done(matched)

}
