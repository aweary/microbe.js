# microbe.js

[![Join the chat at https://gitter.im/Aweary/microbe.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Aweary/microbe.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)  [![Build Status](https://travis-ci.org/Aweary/microbe.js.svg?branch=master)](https://travis-ci.org/Aweary/microbe.js)

A small, easy to use Node.js framework for serving simple websites using the Handlebars template engine.


# Install

Microbe.js is available via the NPM registry.

``` npm install microbe.js```


# Usage

## General

Microbe.js acts very similarly to Express.js in that you require the main package and instantiate your application by invoking it as a function.

Below is a basic example with only one route.

```js

var microbe = require('microbe.js')
var app = microbe({engine: 'handlebars'})

app.route('/', function(req, res){
  res.render('index', {title: 'This is the main page!'})
})

```

## Routing

Routing is verstaile and can be accomplished in a number of different ways. If you want to handle a basic route with just a GET request handler, you can invoke `app.route` with the path and handler

```js

  app.route('/', function(req, res){
    res.render('index')
   })

```


You can also use chaining to attach different HTTP request handlers for a route.

```js

  app.route('/api')
     .get(function(req, res) { /* Handle POST request as you like */ })
     .post(function(req, res){ /* Handle POST request as you like */ })

```

Route parameters are also available on the `req` object via `req.params`.

```js
app.route('/article/:id', function(req, res) {
   res.render('article', { articleID: req.params.id })
})
```

## Rendering


Microbe implements `consolidate.js` which means you can use any of the supported engines. [Check their repo](https://github.com/tj/consolidate.js) for a comprehensive list.

You have to set a rendering engine if you're going to be using the `res.render` method, otherwise an error will be thrown.

You can do so when you instantiate the app:

```js

var microbe = require('microbe')
var app = microbe({
  engine: 'handlebars'
})

```

Or you may do so using the `app.set` method:

```js
var microbe = require('microbe')
var app = microbe()
app.set('engine', 'jade')
```

Microbe will assume that your file extensions will be the same as the engine's name (e.g., `handlebars` uses `[name].handlebars`, `jade` uses `[name].jade`, etc.). If you need to use a different extension then set the `ext` value as well.

```js
var app = microbe({
  engine: 'handlebars',
  ext: 'hbs'
})

/* or app.set('ext', 'hbs') */
```


`res.render` takes the file name (minus the extension) as the first argument and the data to render as the second/

```js
  res.render('about', {time: Date.now()})
```


## Middlware

Middleware is added to a route using the `app.use` method. The first argument is the route for which the middleware should be invoked. If no route is provided, then it will be used on all routes.

```js

  app.use('/api', function(req, res){
    console.log('API request has been received!')
  })

```


## State and configurations

If you need to configure your `Microbe.js` application, you can use the `app.set` method for adjusting values in the internal state object. Currently, the only two properties you should really be setting yourself are the 'views' nad 'publicFolder' which, as expected, determine where `Microbe.js` will look for your views and static files, respectively.

```js
  /* this defaults to 'views' */
  app.set('views', 'templates')

  /* this defaults to 'public'*/
  app.set('publicFolder', 'client')
```
