const log4js = require('log4js')
const config = require('../config')
let log = log4js.getLogger(config.database)

module.exports = log