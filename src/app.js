const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const paramStore = require('./libs')
const path = require('path')
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, '../public')))
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

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept,request-type,version'
  )
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use(bodyParser.json({ limit: '50mb' }))

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
  })
)
const apiRoutes = require('./routes')
app.use('/api', apiRoutes)
app.use('/', require('./routes/navegation'))

module.exports = app
