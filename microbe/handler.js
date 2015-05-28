var paramify = require('./params');
var state = require('./state');
var fs = require('fs');

module.exports = function(request, response, app) {

  var routes = app._routeHandlers;
  var path = request._path;
  var type = request._type;
  var found = false;

  /* Handle static requests */
  if (request._staticRequest) {
    response.static(path);
  };

  Object.keys(routes).forEach(function(route) {

    /* Get the Router object itself */
    var router = routes[route];

    /* If the path matches the route's pattern, handle the request */
    if (router.matchPath.test(path)) {

      /* Pass the router, request, and parameters off to parse them */
      var params = router.matchPath.exec(path);

      /* Cache the params if they're not already cached */
      if (state.routeParamters.indexOf(params[0]) === -1) {
        state.routeParamters.push(params[0]);
      }

      paramify(router, request, params);
      /* Handle the actual request now */
      router.handlers[type](request, response);
      return true;
    }

  });

};
