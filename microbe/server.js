var http				= require('http')

var responsify	= require('./response')
var requestify  = require('./request')
var routeHandler = require('./handler')

module.exports = function(port, app) {

  return http.createServer(function(request, response) {

    /* Augment response object for view rendering */
    responsify(request, response, app)
    /* Augument request object for route handling */
    requestify(request, response, app)
    /* Pass off request and response for route handling */
    routeHandler(request, response, app)

  })

}
