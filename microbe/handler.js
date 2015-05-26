module.exports = function(request, response, app) {

  var requestType = request.method.toString().toLowerCase();
  var path = request._path;

  /* Handle 404 requests */
  if (!app._routeHandlers[path] && !request._staticRequest) response.end('404 not found');

  /* Handle static file routing */
  else if (request._staticRequest) response.static(path)

  /* Otherwise, pass the request to the main app route cache */
  else app._routeHandlers[path].handlers[request._type](request, response);

}
