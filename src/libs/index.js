
// global aws
async function loadConfigs () {
  if (process.env.APP_ENV === 'development') {
    return {
      nodeEnv: process.env.NODE_ENV,
      appEnv: process.env.APP_ENV,
      mysql: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
      }
    }
  }
}

module.exports = {
  loadConfigs
}
