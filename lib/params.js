import bugger from 'debug'

const debug = bugger('params')

export default function(duplex, router) {

  const result = {}
  const matches = router.match
  const keys = Object.keys(matches.keys).map(match => {
    return matches.keys[match].name
  })
  const params = matches.exec(duplex.path).slice(1)

  if (params.length !== keys.length) {
    throw new Error('Route parameter length mismatch')
  }

  keys.forEach((key, i) => result[key] = params[i] )

  return result

}
