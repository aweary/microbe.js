var microbe = require('./index');
var app = microbe({port: 3000});

app.route('/', function(req, res) {
  console.log(req, res)
})

app.route('/help')
   .get(function(req, res){ return req })
   .post(function(req, res){ return res});


console.log(app._getRoutes());
