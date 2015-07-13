var Server   = require('./server');
var Router   = require('./router');
var routeHandler = require('./handler');
var State = require('./state');
var url = require('url');
var fs = require('fs');
var path = require('path');
var err = require('./utilities/error');
var pathRegEx = require('path-to-regexp');

exports = module.exports = proto = {};


/**
 * proto._cacheStaticPaths
 * @param  {String} rootDirectory path to recursively search in
 * @summary builds an in-memory cache of the existing static files.
 *          It recursively climbs the decalured static resource folder
 *          and builds a cache of all the file paths.
 */

proto._cacheStaticPaths = function(rootDirectory) {

  var _this = this;
  fs.readdir(rootDirectory, function(err, data) {

    if (err) throw new Error('Public directory either not found or inaccessible');

    /* Determine the path and whether its a file or folder */
    data.forEach(function(file) {

      var location = path.resolve(rootDirectory + '/' + file);
      var folder = fs.lstatSync(location).isDirectory();

      if (folder) _this._cacheStaticPaths(location)
      else _this.state.staticRoutes.push(location);

    })

  });

}

/**
 * proto.route
 * @param  {String} path base location for route
 * @param  {Object} router  Microbe router object
 * @summary used to set the routes for the Microbe proto
 */

proto.route = function(path, router) {

  /* Cache the path no matter what */
  this.state.routes.push(path);

  /* If a function is passed, treat it as a basic GET route */
  if (typeof router === 'function') {

    var routeObject = Router(path).get(router);
    this.state.routers[path] = routeObject;
    return true;
  }

  /* If an object is passed, assume it is a Router object */
  else if (typeof router === 'object') {
    this.state.routers[path] = router;
    return true;
  }

  /* If no route handler is passed, assume the user wants to chain routes*/
  else if (!router) {
    var routeObject = Router(path);
    this.state.routers[path] = routeObject;
    return routeObject;
  }

};

/**
 * proto.use
 * @param  {String} route      route for the middleware
 * @param  {Function} middleware actual middleware handler
 * @summary registers middleware with the microbe.js app
 */
proto.use = function(route, middleware) {
  if (!middleware) route = '*';
  this.state.middleware.push({route: route, handler: middleware});
}





/**
 * proto.set
 * @param  {String} key   setting being changed
 * @param  {String} value new value for the setting
 * @summary used to set internal states like the view location, public folder
 *          and other configurations
 */

proto.set = function(key, value) {
  if (!this.state[key]) throw new Error('Cannot configure property: ' + key);
  this.state[key] = value;
}


/**
 * proto.start
 * @param  {Number}   port     HTTP Port for server
 * @param  {function} callback Callback function once server starts
 * @summary used to start the actual HTTP server for the Microbe proto
 */
proto.start = function(port, callback) {

  this._cacheStaticPaths(this.state.publicPath);
  this.port = port;
  proto._server = Server(port, this);
  proto._server.listen(port, callback(proto._server));

}
