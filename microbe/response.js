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
    catch (err) { console.log(err) };

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

  response.static = function(file) {

    /* Assume the file actually exists  */
    var exists = true;
    /* Get the entire absolute path for the file we want to serve */
    var location = path.resolve(state.publicPath + file);

    /* Esure that the file really does exists */
    try { fs.lstatSync(location) } catch (err) { exists = false };

    if (exists) fs.createReadStream(location).pipe(this)

    /* If we can't find the path, we've got some work to do */
    else {

      var directories = file.split('/');
      var anchor = directories.indexOf(state.publicFolder);

      for (i = anchor; i < directories.length; i++) {

        var _path = directories.slice(i).join('/');
        var location = path.resolve(state.publicPath + '/' +  _path);

        if (state.staticPaths.indexOf(location) !== -1) {
          fs.createReadStream(location).pipe(this);
        }

      }
      /* Find the public folder, then reference the cached static files to see where the actual route starts. Re-add the folders to the cached list too to make this easy. Once you find the public folder in the path, go through and join the paths that follow, removing them one my one until it matches a path.*/

    }
  }
}
