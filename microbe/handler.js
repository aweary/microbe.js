var paramify = require('./params');
var fs = require('fs');

module.exports = function(request, response, app) {

  var routers = app.state.routers;
  var path   = request.path;
  var type   = request.type;
  var found  = false;

  /* Handle static requests */
  if (request.staticRequest) {
    response.static(path);
  };


  Object.keys(routers).forEach(function(route) {

    /* Get the Router object itself */
    var router = routers[route];

    /* If the path matches the route's pattern, handle the request */
    if (router.matchPath.test(path)) {

      /* Pass the router, request, and parameters off to parse them */
      var params = router.matchPath.exec(path);

      /* Cache the params if they're not already cached */
      if (app.state.routeParamters.indexOf(params[0]) === -1) {
        app.state.routeParamters.push(params[0]);
      }

      paramify(router, request, params);

      /* Handle any declared middlware */

      if (app.state.middleware.length) {
        app.state.middleware.forEach(function(handler) {
        handler(request, response);
      });

      }
      /* Handle the actual request now */
      router.handlers[type](request, response);
      return true;
    }

  });

};
