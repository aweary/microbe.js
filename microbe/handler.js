var paramify = require('./params')
var debug = require('debug')('handler')
var fs = require('fs')
var final = require('finalhandler')

module.exports = function(request, response, app) {

  var routers = app.state.routers
  var done = final(request, response)
  var stack = app.state.middleware
  var path   = request.path
  var type   = request.type
  var found  = false
  var matched = false


  /* Handle static requests */
  if (request.staticRequest) {
    response.static(path)
    debug('Rendering static file: %o', path)
    return
  }

  debug('Requested view: %o', path)

  Object.keys(routers).forEach(function(route) {

    var router = routers[route]

    if (router.matchPath.test(path)) {

      matched = true

      var params = router.matchPath.exec(path)

      /* Cache the params if they're not already cached */
      if (app.state.routeParamters.indexOf(params[0]) === -1) {
        app.state.routeParamters.push(params[0])
      }

      paramify(router, request, params)


      if (stack.length) {
        stack.forEach(function(middleware) {
          var handler = middleware.handler
          var route = middleware.route
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
