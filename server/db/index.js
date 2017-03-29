const mongoose = require('mongoose')
const config = require('../config')
const log = require('../utils/log')

mongoose.Promise = global.Promise

let url = `${config.sqlHost}:${config.sqlPort}/${config.database}`
mongoose.connect(url)
const db = mongoose.connection

db.on('error', (err) => {
  log.debug('db connect error: ', err)
})

db.on('open', () => {
  log.debug('db is ready')
})

module.exports = db