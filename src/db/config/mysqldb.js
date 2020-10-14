const mysql = require('mysql')

/**
 * Estabelece uma conexão com o banco de dados
 * Define a instancia numa variavel global, e retorna
 * a mesma se já existe, reutilizando a conexão
 */

module.exports = async (config) => {
  if (!config) return new Error('Config not found')
  if (global.globalMysqlConn) {
    // console.log('MYSQL IN CHACHE')
    return Promise.resolve(global.globalMysqlConn)
  } else {
    // console.log('MYSQL NOT IN CHACHE')
    return new Promise((resolve, reject) => {
      var connection = mysql.createConnection({
        host: config.mysql.host,
        port: config.mysql.port,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database
      })
      connection.connect(function (err) {
        if (err) {
          reject(new Error('Não foi possível fazer a conexão com o Mysql' + err.stack))
        }
        global.globalMysqlConn = connection
        resolve(connection)
      })
    })
  }
}
