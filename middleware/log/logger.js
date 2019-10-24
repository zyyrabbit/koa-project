const log4js = require('log4js')
const utils = require('../../utils')

const access = (ctx, message, commonInfo) => {
  const {
    method,  // 请求方法 get post或其他
    url,		  // 请求链接
    host,	  // 发送请求的客户端的host
    headers,	  // 请求中的headers
  } = ctx.request;
  
  const client = {
    method,
    url,
    host,
    message,
    referer: headers['referer'],  // 请求的源地址
    userAgent: headers['user-agent']  // 客户端信息 设备及浏览器信息
  }
  return JSON.stringify(Object.assign(commonInfo, client))
}

const methods= ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']

const baseInfo = {
  appLogLevel: 'debug',
  dir: 'logs',
  env: 'dev',
  projectName: 'koa2-project',
  serverIp: utils.network.getIPAdress()
}

module.exports = (options = {}) => {

  const contextLogger = {}
  const appenders = {}
  // 继承自 baseInfo 默认参数
  const opts = Object.assign({}, baseInfo, options)
  // 需要的变量解构 方便使用
  const { env, appLogLevel, dir, serverIp, projectName } = opts
  const commonInfo = { projectName, serverIp }
	
  appenders.cheese = {
    type: 'dateFile',
    filename: `${dir}/task`,
    pattern: 'yyyy-mm-dd.log', // -yyyy-mm-dd.log
    alwaysIncludePattern: true
  }
  
  if (env === 'dev' || env === 'local' || env === 'development') {
    appenders.out = {
      type: 'console'
    }
  }
  let config = {
    appenders,
    categories: {
      default: {
        appenders: Object.keys(appenders),
        level: appLogLevel
      }
    }
  }

  const logger = log4js.getLogger('cheese')

  return async (ctx, next) => {
    const start = Date.now()
    log4js.configure(config)
    methods.forEach((method, i) => {
      contextLogger[method] = (message) => {
        logger[method](access(ctx, message, commonInfo))
      }
    })
    ctx.log = contextLogger;

    await next()
    const responseTime = Date.now() - start
    logger.info(access(ctx, {
      responseTime: `响应时间为:${responseTime}ms`
    }, commonInfo))
  }
}