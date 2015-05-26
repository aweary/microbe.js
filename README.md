# microbe.js
A small, easy to use Node.js framework for serving simple websites using the Handlebars template engine.


# Install

Microbe.js is available via the NPM registry.

``` npm install microbe.js```


# Usage

## General

Microbe.js acts very similarly to Express.js in that you require the main package and instantiate your application by invoking it as a function.

Below is a basic example with only one route.

```js

var microbe = require('microbe.js');
var app = microbe();

app.route('/', function(req, res){
  res.render('index', {title: 'This is the main page!'});
})

```

## Routing

Routing is verstaile and can be accomplished in a number of different ways. If you want to handle a basic route with just a GET request handler, you can invoke `app.route` with the path and handler

```js

  app.route('/', function(req, res){
    res.render('index');
   })

```


You can also use chaining to attach different HTTP request handlers for a route.

```js

  app.route('/api')
     .get(function(req, res) { /* Handle POST request as you like */ });
     .post(function(req, res){ /* Handle POST request as you like */ });

```


## Rendering


Microbe uses handlebars for rendering. Place your views in a `views` folder and use `res.render` to render that view with any variable you'd like.

```js
  res.render('about', {time: Date.now()});
```
