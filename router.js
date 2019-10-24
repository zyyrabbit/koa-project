const router = require('koa-router')()
const routerInit = require('./router/index.js')

module.exports = (app) => {
 
  routerInit(app, router)

  app.use(router.routes())
      .use(router.allowedMethods())
}