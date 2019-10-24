const koa = require('koa')
const router = require('./router')
const middleware = require('./middleware')
const uitls = require('./utils')

const app = new koa()

app.uitls = uitls

middleware(app)
router(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
