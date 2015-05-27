var fs				= require('fs');
var path			= require('path');
var oppressor = require('oppressor');
var Handlify  = require('./handlebars.js');
var state     = require('./state');
var test      = require('./utilities/error').try;

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

    try { fs.lstatSync(state.viewLocation) }
    catch (err) { throw new Error('View location not found: ' + state.views + '. Use app.set(\'views\', [view]) to set a custom view location. Otherwise use the \'views\' folder.')};

    /* Use app state to get view location */
    var location = path.resolve(state.viewLocation + '/' + view + '.html');
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
    var location = path.resolve(state.publicFolder + '/' + filePath);
    var stream = fs.createReadStream(location);
    stream.pipe(this);
  }
}
