const path = require('path')
const requireModules = require('../utils/requireModules.js')

const register = function (opts) {
  let { app, rules = []} = opts
  // 如果参数缺少实例 app，则抛出错误
  if (!app) {
    throw new Error('the app params is necessary!')
  }
  const appKeys = Object.keys(app)
  rules.forEach((item) => {
    let { folder, name } = item
    if (appKeys.includes(name)) {
      throw new Error(`The name of ${name} already exists!`)
    }
    app[name] = requireModules(folder)
  })
}

module.exports = (app) => {
  register({
    app,
    rules: [
      {
        folder: path.join(__dirname, '../controller'),
        name: 'controller'
      },
      {
        folder: path.join(__dirname, '../service'),
        name: 'service'
      },
      {
        folder: path.join(__dirname, '../dao'),
        name: 'dao'
      },
      {
        folder: path.join(__dirname, '../model'),
        name: 'model'
      },
    ]
  })
}