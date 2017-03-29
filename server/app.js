import koa from 'koa'
import bodyParser from 'koa-bodyparser'
import koaRouter from 'koa-router'
import fs from 'fs'
import path from 'path'
const config = require('./config/config')

const app = new koa()
app.use(bodyParser())

const router = koaRouter()

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  log.info(`${ctx.method} ${decodeURIComponent(ctx.url)} - ${ms}ms`)
})

(async () => {
  app.listen(config.serverPort)
})