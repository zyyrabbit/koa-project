const koaBody = require('koa-body');
const sendJson = require('./sendJson')
const logger = require('./log/index')
const httpError = require('./http-error')
const register = require('./register')

module.exports = (app) => {
  app.use(httpError())
  app.use(logger())
  app.use(koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200*1024*1024	// 设置上传文件大小最大限制，默认2M
    }
  }))
  app.use(sendJson())

  register(app)
}