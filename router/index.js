const userRouter = require('./userRouter.js')
const fileRouter = require('./fileRouter.js')

module.exports = function(app, router) {
  userRouter(app, router)
  fileRouter(app, router)
}