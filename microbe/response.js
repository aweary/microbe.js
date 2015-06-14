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

    console.log('Rendering %j with data %j', view, data);
    var handlebars = new Handlify(data || {});

    try { fs.lstatSync(app.state.viewLocation) }
    catch (err) { console.log(err) };

    /* Use app state to get view location */
    var location = path.resolve(app.state.viewLocation + '/' + view + '.html');
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

    console.log('Sending static file...');
    /* Assume the file actually exists  */
    var exists = true;
    /* Get the entire absolute path for the file we want to serve */
    var location = path.resolve(app.state.publicPath + file);

    /* Esure that the file really does exists */
    try { fs.lstatSync(location) } catch (err) { exists = false };

    if (exists) fs.createReadStream(location).pipe(this)

    /* If we can't find the path, we've got some work to do */
    else {

      /* Split the path into an array containing each directory/file */
      var directories = file.split('/');
      /* Find where the public folder is and make it the anchor point */
      var anchor = directories.indexOf(app.state.publicFolder);

      /* Try joining the paths, removing one directory on each iteration */
      for (i = anchor; i < directories.length; i++) {

        var _path = directories.slice(i).join('/');
        var location = path.resolve(app.state.publicPath + '/' +  _path);

        /* If the path matches a cached route, stream it to the user */
        if (app.state.staticRoutes.indexOf(location) !== -1) {
          fs.createReadStream(location).pipe(this);
        }
      }
    }
  }

  response.json = function(json) {
    if (typeof json === 'object') json = JSON.stringify(json);
  };



}
