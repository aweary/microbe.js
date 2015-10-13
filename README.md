# Microbe.js

[![Join the chat at https://gitter.im/Aweary/microbe.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Aweary/microbe.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)  [![Build Status](https://travis-ci.org/Aweary/microbe.js.svg?branch=master)](https://travis-ci.org/Aweary/microbe.js)

A small, easy to use Node.js framework.


# Installation

``` npm install microbe.js```


# Usage


Microbe.js acts very similarly to Express.js in that you require the main package and instantiate your application by invoking it as a function.

Below is a basic example with only one route.

```js

import microbe from 'microbe.js'
const app = microbe(__dirname)

app.route({
  path: '/',
  method: 'GET',
  handler: duplex => duplex.render('index', {content: 'This is content!'})
})

app.on('start', () => {
  console.log(`Application started on port ${app.get('port')}`);
})

app.start(3000);
```

Currently you must pass `__dirname` to the `microbe` function so
it can easily locate relative folders/files.

Unlike a vanilla Node server the callback function only takes
one argument, `duplex`.

`duplex` provides an access point for all request and response
methods/accessors you'd need to use. For example, you can get the request method at `duplex.method` and you can render a response
with `duplex.render`. You can also access the full request and response objects on `duplex.req` and `duplex.res` respectively/

`duplex` simplifies the API and makes sure that the `ServerResponse` and `ClientRequest` objects aren't manipulated
directly, so if you feel you need to access those objects directly, open an issue and we can get a better API setup.


## Routing

Routing is accomplished using the `app.route` method which accepts an objects used to build the route, or using convenience
methods as described below.


`app.route` lets you declare your routes in a very direct
way by explicitly providing the `path`, `method`, and `handler`
options.


```js
app.route({
  path: '/documents/:document',
  method: 'GET',
  handler: duplex => {
    let document = duplex.params.document
    duplex.static(`/documents/${document}`)
  }
})
```

Route parameters are also available on the `req` object via `req.params`.

Microbe.js also provides standard convenience methods such as `app.get` and `app.post`

```js
let details = getSomeDetailObject()
app.get('/', duplex => duplex.json({ details }))
```

## Rendering


Microbe.js implements `consolidate.js` which means you can use any of the supported engines. [Check their repo](https://github.com/tj/consolidate.js) for a comprehensive list.

You have to set a rendering engine if you're going to be using the `res.render` method, otherwise an error will be thrown.

Or you may do so using the `app.set` method:

```js
import microbe from 'microbe.js'
const app = microbe(__dirname)
app.set('engine', 'handlebars')
```

Microbe.js will assume that your file extensions will be the same as the engine's name (e.g., `handlebars` uses `[name].handlebars`, `jade` uses `[name].jade`, etc.). If you need to use a different extension then set the `ext` value as well.

```js
app.set('ext', 'hbs')
```


`duplex.render` takes the file name (minus the extension) as the first argument and the data to render as the second

```js
  res.render('about', {time: Date.now()})
```


## Middlware

Middleware is added to a route using the `app.use` method. The first argument is the route for which the middleware should be invoked. If no route is provided, then it will be used on all routes.

```js

  app.use('/api', duplex => {
    doSomeLoggingOrSomething(duplex)
  })

```

## Events
The `app` object does inherit from `EventEmitter` meaning it can `emit` events and also listen for events. Currently there are a limited number of internal events, but you may attach a listener to any of them:

`kickoff` is emitted when the app is being initialized/bootstrapped

`route` is emitted when a request is routed, and it emits a data object with the signature `{ path, method, handler }`

`start` is emitted when the application starts, and it emits the port the app started on.

## State and configurations

If you need to configure your `Microbe.js` application, you can use the `app.set` method for adjusting values in the internal state object. Currently, the only two properties you should really be setting yourself are the 'views' nad 'publicFolder' which, as expected, determine where `Microbe.js` will look for your views and static files, respectively.

```js
  /* this defaults to 'views' */
  app.set('views', 'templates')

  /* this defaults to 'public'*/
  app.set('publicFolder', 'client')
```
