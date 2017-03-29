const Redis = require('ioredis')
const config = require('../config')
const log = require('../utils/log')

const redis = new Redis({
  host: config.redisHost,
  port: config.redisPort,
  password: config.redisPsw
})

redis.on('error', function (err) {
  log.error('Redis Error:' + err)
})

redis.on('connect', function () {
  log.debug('Redis is ready')
})

module.exports = redis