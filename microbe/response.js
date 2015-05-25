var fs				= require('fs');
var path			= require('path');
var oppressor = require('oppressor');
var Handlify  = require('./handlebars.js');

// Add aditional methods to the response object;
module.exports = function(request, response) {

  // response.render allows for easy HTML rendering
  response.render = function(view, data) {

    var handlebars = new Handlify(data || {});
    var stream = fs.createReadStream(path.normalize(__dirname + '/../views/' + view + '.html'));
    stream.pipe(handlebars).pipe(oppressor(request)).pipe(this);
  }
}
