var url = require('url');

module.exports = function(request, response) {

  var filePath = url.parse(request.url).pathname;
  var staticMatch = /\.(css|js|png|jpg|svg|pdf)$/;

  /* Attach a _staticRequest property to requests identified as static */
  if (staticMatch.test(filePath)) request._staticRequest = true;

  /* Attach the path for ease of use in future functions */
  request._path = filePath;

  /* Do the same for the request type */
  request._type = request.method.toString().toLowerCase();

}
