var Server   = require('./server');
var Router   = require('./router');
var url = require('url');

module.exports = function() {

  /* Instantiate the returned object, which will be the app itself */
  var app = {};

  app._defaults = {

    port: 3000,
    viewsLocation: '/views/',
    templateEngine: 'handlebars'

  };

  app._routeHandlers = { };

  /**
   * app._handleRequest
   * @param  {String} requestType HTTP request type
   * @param  {object} request     Node HTTP request object
   * @param  {object} response    Node HTTP response object
   * @summary appropriately routes requests
   */
  app._handleRequest = function(requestType, request, response) {

    var path = url.parse(request.url).pathname;

    // Ignore favicon requests for now...
    if (path == '/favicon.ico') return;

    if (app._routeHandlers[path] === undefined) router._handle404(request, response);

    else app._routeHandlers[path].handlers[requestType](request, response);

  };


  /**
   * app.route
   * @param  {String} baseURL base location for route
   * @param  {object} router  Microbe router object
   * @summary used to set the routes for the microbe app
   */

  app.route = function(baseURL, router) {

    /* If a function is passed, treat it as a basic GET route */
    if (typeof router === 'function') {
      var routeObject = Router(baseURL).get(router);
      app._routeHandlers[baseURL] = routeObject;
      return true;
    }

    /* If an object is passed, assume it is a Router object */
    else if (typeof router === 'object') {
      app._routeHandlers[baseURL] = router;
      return true;
    }
    /* If no route handler is passed, assume the user wants to chain routes*/
    else if (!router) {
      var routeObject = Router(baseURL);
      app._routeHandlers[baseURL] = routeObject;
      return routeObject;
    }

  };

  app.start = function(port, callback) {

    var server = Server(port, app);
    server.listen(port, callback);

  }

  return app;

}
