var expect = require('chai').expect

describe('State', function() {

  var microbe = require('../dist/index')
  var app

  beforeEach(function(done) {
    app = microbe()
    done()
  })

  it('should update the view location with app.set', function() {

    app.set('views', 'test')
    expect(app.state.views).to.equal('test')

  })

  it('should return "views" as the defualt view location', function() {

    expect(app.state.views).to.equal('views')
  })

  it('should return an empty array for middleware by default', function() {
    expect(app.state.middleware).to.be.a('array')
    expect(app.state.middleware.length).to.equal(0)
  })

  it('should return an empty array for routes', function() {
    expect(app.state.routes).to.be.a('array')
    expect(app.state.routes.length).to.equal(0)
  })

  it('should add declared routes to state.routes', function() {

    app.route('/', {})
    expect(app.state.routes).to.contain('/')
  })

  it('should have an empty static routes', function(){
    expect(app.state.staticRoutes).to.be.a('array')
    expect(app.state.staticRoutes.length).to.equal(0)
  })


})
