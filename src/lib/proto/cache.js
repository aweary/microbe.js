import bugger from 'debug'
import fs from 'fs'
import path from 'path'
import error from '../../util/error'
import { isFolder } from '../../util/helpers'

const debug = bugger('app:cache')

/**
 * builds an in-memory cache of the existing static files.
 * It recursively climbs the decalured static resource folder
 * and builds a cache of all the file paths. proto.cache
 * @param  {String} root path to recursively search in
 */


export default function(root) {

  const self = this
  const routes = this.state.staticRoutes

  debug('Caching static paths for %o', root)

  fs.readdir(root, (err, files) => {

    if (err) error('missing', root)

    files.forEach(file => {

      const location = path.resolve(root, file)

      isFolder(location)
          ? self.cache(location)
          : routes.push(location)

    })
  })
}
