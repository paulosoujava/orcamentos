const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const paramStore = require('./libs')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static('public'))
app.use(expressLayouts)
app.use(bodyParser.urlencoded({ extended: true }))

// Middlware: Handling Database Connection
let cacheConnDB = null
app.use(async (req, res, next) => {
  if (cacheConnDB) {
    res.locals.mysql = cacheConnDB
    // console.log('Middleware DB: use cache')
    return next()
  }

  try {
    res.locals.config = await paramStore.loadConfigs()
    var mysqldb = await require('./db/config/mysqldb')
    // console.log('Middleware DB: establish new connection')
    res.locals.mysql = await mysqldb(res.locals.config)
    cacheConnDB = res.locals.mysql

    return next()
  } catch (err) {
    // console.log('Middleware DB: error')
    return next(err)
  }
})

app.use(function (req, res, next) {
  var send = res.send
  res.send = function (body) {
    if (res.statusCode >= 499) {
      try {
        res.locals.mysql.serverConfig.close()
        cacheConnDB = false
        global.globalMysqlConn = false
      } catch (err) {
        console.log(err)
      }
    }
    send.call(this, body)
  }
  next()
})

const apiRoutes = require('./routes')
app.use('/api', apiRoutes)
app.use('/', require('./routes/navegation'))

module.exports = app
