var url = require('url');

module.exports = function(request, response, app) {

  var filePath = url.parse(request.url).pathname;
  var staticMatch = /\.(css|js|png|jpg|svg|pdf)$/;

  if (staticMatch.test(filePath)) request._staticRequest = true;
  request._path = filePath;
  request._type = request.method.toString().toLowerCase();

}
