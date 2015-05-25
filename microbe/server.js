var http				= require('http');
var url					= require('url');
var responsify	= require('./response');

module.exports = function(router, port) {

  var port = typeof port === 'number' ? port : parseInt(port);
  if (isNaN(port)) throw new Error('Port must be a numerical value');

  var server = http.createServer(function(request, response) {

    var requestType = request.method.toString().toLowerCase();
    responsify(request, response);
    router._handleRequest(requestType, request, response);

  });

  server.listen(port, function() { console.log('Listening on port ' + port) });

}
