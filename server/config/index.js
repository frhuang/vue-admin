const env = process.env

module.exports = {
  serverPort: env.serverPort || 8082,
  sqlHost: env.sqlHost || "127.0.0.1",
  sqlPort: env.sqlPort || 27017,
  database: env.database || 'hfrblog',

  redisPort: env.redisPort || '127.0.0.1',
  redisHost: env.redisHost || 6379,
  redisPsw: env.redisPsw || ''
}