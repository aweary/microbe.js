var fs				= require('fs');
var path			= require('path');
var oppressor = require('oppressor');
var Handlify  = require('./handlebars.js');

// Add aditional methods to the response object;
module.exports = function(request, response, app) {

  /**
   * response.render
   * @param  {String} view View to render
   * @param  {data} data Data to render with the view
   * @summary renders the handebar partials using streams
   */

  response.render = function(view, data) {

    var handlebars = new Handlify(data || {});
    /* Use app state to get view location */
    var location = path.resolve(app._state.viewLocation + '/' +  view + '.html');
    /* Open a read stream and pipe it through any transforms */
    var stream = fs.createReadStream(location);
    stream.pipe(handlebars).pipe(oppressor(request)).pipe(this);
  }

  /**
   * response.static
   * @param  {String} path Filesystem path for static file
   * @summary send static files to the client
   */

  response.static = function(filePath) {
    var location = path.resolve(app._state.publicFolder + '/' + filePath);
    var stream = fs.createReadStream(location);
    stream.pipe(this);
  }
}
