const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const path = require('path')
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
      uploadDir: path.resolve(__dirname, '../static/upload/temp/'),
      maxFileSize: 200*1024*1024	// 设置上传文件大小最大限制，默认2M
    }
  }))
  //开启静态文件访问
  app.use(koaStatic(
    path.resolve(__dirname, '../static') 
  ));
  app.use(sendJson())

  register(app)
}