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

  /* Middlware for custom route handling */
  middlware: []

};

module.exports = _state;
