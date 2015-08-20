import proto from './proto'
import State from './state'
import merge from 'merge'


export default function(opts) {

  const app = Object.create(proto)
  let state = new State()
  app.state = merge(state, opts)

  return app

}
