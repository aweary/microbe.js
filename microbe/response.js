var fs				= require('fs');
var path			= require('path');
var oppressor = require('oppressor');
var Handlify  = require('./handlebars.js');

// Add aditional methods to the response object;
module.exports = function(request, response, app) {

  // response.render allows for easy HTML rendering
  response.render = function(view, data) {

    var handlebars = new Handlify(data || {});
    /* Use app state to get view location */
    var location = path.resolve(app._state.viewLocation + '/' + view + '.html');
    /* Open a read stream and pipe it through any transforms */
    var stream = fs.createReadStream(location);
    stream.pipe(handlebars).pipe(oppressor(request)).pipe(this);
  }
}
