var path = require('path');

/**
 * _state
 * @type {Object}
 * @summary internal state object used globally for app configurations
 */

var _state = {

  /* Base path for the entire project/server */
  projectRoot: path.resolve('./'),

  /* Base directory for views */
  views: 'views',

  /* Getter for viewLocation, so it can be dynamic */
  get viewLocation() { return path.resolve('./' + this.views + '/')},

  /* used to deliver static content */
  publicFolder: 'public',

  /* Getter for publicLocatioin so it can be dynamic */
  get publicPath() { return path.resolve('./' + this.publicFolder + '/' )},

  /* Middlware for custom route handling */
  middlware: [],

  /* Route paramters registered with the app */
  routeParamters: [],

  /* Cached static file paths */
  staticPaths: [],

  /* List of the paths the app will expect */
  routes: []

};

module.exports = _state;
