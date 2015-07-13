var expect = require('chai').expect;
var microbe = require('../microbe/index');

describe('Microbe constructor', function() {

  var app;

  beforeEach(function(done) {
    app = microbe();
    done();
  })

  it('should return an object when invoked', function() {
    expect(app).to.be.a('object');
  });

  it('should have a private _state object', function() {
    expect(app.state).to.be.a('object');
  });

  it('should inherit from proto.js', function() {
    var proto = require('../microbe/proto');
    expect(app.__proto__).to.equal(proto);
  });

  it('should have a route method', function() {
    expect(app.route).to.be.a('function');
  });

  it('should have a use method', function() {
    expect(app.use).to.be.a('function');
  })

  it('should add all declared routes to app.state.routes', function() {
    app.route('/', function(req, res) { return true });

    expect(app.state.routes).to.contain('/');

  });

});
