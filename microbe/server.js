var http				= require('http');
var url					= require('url');
var responsify	= require('./response');

module.exports = function(port, app) {

  return http.createServer(function(request, response) {

    /* Determine incoming request type */
    var requestType = request.method.toString().toLowerCase();

    /* Augment response object for view rendering */
    responsify(request, response, app);

    /* Pass request type to the request handler method of the router */
    app._handleRequest(requestType, request, response);

  });

}
