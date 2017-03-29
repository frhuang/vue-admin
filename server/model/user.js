const BaseSchema = require('./baseSchema')
const db = require('../db')

const userSchema = BaseSchema.extend({
  name: String,
  password: String
})

const user = db.model('User', userSchema, 'user')
module.exports = user
