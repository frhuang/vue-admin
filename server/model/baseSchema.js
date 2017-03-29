const mongoose = require('mongoose')
const Schema = mongoose.Schema

const redis = require('../db/redis')

function baseFind(method, params, time) {
  const self = this
  const collectionName = self.collection.name
  const dbName = self.db.name
  const redisKey = [dbName, collectionName, JSON.stringify(params)].join(':')
  const expireTime = time || 3600

  return new Promise((resolve, reject) => {
    redis.get(redisKey, (err, data) => {
      if (err) return reject(err)
      if (data) return resolve(JSON.parse(data))

      self[method](params).lean().exec((err) => {
        if (err) return reject(err)
        if (Object.keys(data).length === 0) return resolve(data)

        redis.setex(redisKey, expireTime, JSON.stringify(data))
        resolve(data)
      })
    })
  })
}

const Methods = {
  findCache(params, time) {
    return baseFind.call(this, 'find', params, time)
  },
  findOneCache(params, time) {
    return baseFind.call(this, 'findOne', params, time)
  },
  findByIdCache(params, time) {
    return baseFind.call(this, 'findById', params, time)
  }
}

const BaseSchema = function () {
  this.defaultOpts = {

  }
}

BaseSchema.prototype.extend = function (schemaOpts) {
  const schema = this.wrapMethods(new Schema(schemaOpts, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }))

  return schema
}

BaseSchema.prototype.wrapMethods = function (schema) {
  schema.post('save', (data) => {
    const dbName = data.db.name
    const collectionName = data.collection.name
    const redisKey = [dbName, collectionName, JSON.stringify(data._id)].join(':')
    redis.setex(redisKey, 3600, JSON.stringify(this))
  })

  Object.keys(Methods).forEach((method) => {
    schema.statics[method] = Methods[method]
  })

  return schema
}

module.exports = new BaseSchema()