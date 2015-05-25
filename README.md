# microbe.js
A small, easy to use Node.js framework for serving simple websites using the Handlebars template engine.

# Usage

Currently you can use Microbe.js by downloading the files and requiring the individual router and server modules.

```js


var Router = require('./microbe/router');
var Server = require('./microbe/server');

/* Handle root route */
var router = new Router('/');

/* Pass the router to the server function along with your desired port*/
var server = Server(router, 3000);

/* Define the routes as methods on your router object */
router.get('/', function(request, response){
    response.render('index', {title : "Hello world!"})
})


```
