var path = require('path');

function State() {

  /* Base path for the entire project/server */
  this.projectRoot = path.resolve('./');

  /* Base directory for views */
  this.views = 'views';

  /* used to deliver static content */
  this.publicFolder = 'public';

  /* Middlware for custom route handling */
  this.middleware = [];

  /* Route paramters registered with the app */
  this.routeParamters = [];

  /* Cached static file paths */
  this.staticRoutes = [];

  /* List of the paths the app will expect */
  this.routes = [];

  /* Cache for all the actual router objects */
  this.routers = {};

}

/* Define Getters for the dyanically generated publicPath and viewLocation */

Object.__defineGetter__.call(State.prototype, 'publicPath', function() {
  return path.resolve('./' + this.publicFolder + '/');
})

Object.__defineGetter__.call(State.prototype, 'viewLocation', function() {
  return path.resolve('./' + this.views + '/');
});

module.exports = State;
