// server.js
const serverless = require('serverless-http')
const app = require('./src/app')

if (process.env.APP_ENV === 'development') {
  app.set('port', process.env.PORT || 5001)
  app.listen(app.get('port'), function () {
    console.log('Server running http://localhost:' + app.get('port'))
  })
  // ===========================================================================
  // exibir as rotas definidas na app
  const listEndpoints = require('express-list-endpoints')
  const util = require('util')
  console.log(
    util.inspect(listEndpoints(app), {
      compact: false,
      showHidden: false,
      depth: null,
      colors: true
    })
  )
  // ===========================================================================
} else {
  // module.exports.handler = serverless(app)
  // or as a promise
  const handler = serverless(app)

  module.exports.handler = async (event, context) => {
    // you can do other things here
    const result = await handler(event, context)
    // and here
    return result
  }
}
