var microbe = require('./microbe');
var app = microbe();

var Router = require('./microbe/router');

var helpRouter = Router('/help');

helpRouter.get(function(req, res){
  res.render('help', {title: 'It still works!'});
});


app.route('/')
   .get(function(request, response) {
    response.render('index', {title: 'It works!'});
  });

app.route('/help', helpRouter);

app.start(3000, function() {
  console.log('App started on port 3000');
})
