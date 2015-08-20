import http from 'http'
import responsify from './response'
import requestify from './request'
import handler from './handler'



export default function(port, app) {

  return http.createServer((request, response) => {

    /* Augment response object for view rendering */
    responsify(request, response, app)
    /* Augument request object for route handling */
    requestify(request, response, app)
    /* Pass off request and response for route handling */
    handler(request, response, app)

  })

}
