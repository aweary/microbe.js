var url = require('url');
var state = require('./state');

module.exports = function(request, response, app) {

  /* Attach the path for ease of use in future functions */
  request._path = url.parse(request.url).pathname;

  /* Do the same for the request type */
  request._type = request.method.toString().toLowerCase();

  var staticMatch = /\.(css|js|png|jpg|svg|pdf)$/;

  /* Attach a _staticRequest property to requests identified as static */
  if (staticMatch.test(request._path)) {
    request._staticRequest = true;
  }

}
