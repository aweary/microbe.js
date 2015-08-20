import bugger from 'debug'

const debug = bugger('params')

export default function(request, params, matches) {

  request.params = {}
  const values = Object.keys(matches).map(key => matches[key]).slice(1, -2)
  debug('Values %o', values)

  params.forEach((param, index) => {
    let name = param.name
    request.params[name] = values[index]
  })

}
