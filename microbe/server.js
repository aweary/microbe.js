#! /home/vagrant/.nvm/versions/node/v0.12.0/bin/node --harmony

const 

	http 		= require('http'),
	url  		= require('url'),
	responsify  = require('./response');


module.exports = function(router, port){


	var port = typeof port === 'number' ? port : parseInt(port);
	if(isNaN(port)) throw new Error('Port must be a numerical value');


	var server = http.createServer(function(request, response){

		var requestType = request.method.toString().toLowerCase();
		responsify(request, response);
		router._handleRequest(requestType, request, response);

	});

	server.listen(port, function(){ console.log('Listening on port ' + port) });


}




/*


var router = new Router(server);

router.get('/', function(req, res){
	

})


 */