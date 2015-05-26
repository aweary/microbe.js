var Server   = require('./server');
var Router   = require('./router');
var routeHandler = require('./handler');
var url = require('url');
var path = require('path');

module.exports = function() {

  /* Instantiate the returned object, which will be the app itself */
  var app = {};

  app._state = {};
  app._state.projectRoot = path.resolve('./');
  app._state.viewFolder = 'views';
  app._state.viewLocation =  path.resolve('./' + app._state.viewFolder + '/');
  app._state.publicFolder = 'public';

  app._getState = function() {
    return app._state;
  };

  app.Router = Router;

  app._routeHandlers = { };


  /**
   * app.route
   * @param  {String} baseURL base location for route
   * @param  {Object} router  Microbe router object
   * @summary used to set the routes for the Microbe app
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

  /**
   * app.set
   * @param  {String} key   setting being changed
   * @param  {String} value new value for the setting
   * @summary used to set internal states like the view location, public folder
   *          and other configurations
   */

  app.set = function(key, value) {
    if (!app._state[key]) throw new Error('Cannot configure property: ' + key);
    app._state[key] = value;
  }

  /**
   * app.start
   * @param  {Number}   port     HTTP Port for server
   * @param  {function} callback Callback function once server starts
   * @summary used to start the actual HTTP server for the Microbe app
   */
  app.start = function(port, callback) {

    app._server = Server(port, app);
    app._server.listen(port, callback);

  }

  return app;

}
