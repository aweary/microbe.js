var server	= require('./microbe/server.js');
var Router	= require('./microbe/router.js');
var fs			= require('fs');

var router = new Router('/');
var server = server(router, 3000);

router.get('/', function(request, response) {
  response.render('index', {title: Date.now()});
})

router.get('/help', function(request, response) {
  response.render('help');
})
