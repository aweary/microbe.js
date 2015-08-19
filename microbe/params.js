module.exports = function(router, request, params) {

  request.params = {}

  router.params.forEach(function(param) {
    request.params[param.name] = params[router.params.indexOf(param) + 1]
  })

}
