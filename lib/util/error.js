import chalk from 'chalk'

export default function(type, data) {

  var errors = {
    missing: `Unable to locate file/folder ${data}:  path not found`,
    engine: `Render called before render engine was set`,
    middleware: `Cannot set middleware for route ${data}: route not defined`
  }

  throw new Error(chalk.red.bold(errors[type]))

}
