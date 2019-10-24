module.exports = () => {
  let fileName = 'other'
  return async (ctx, next) => {
    try {
       await next();
       /**
        * 如果没有更改过 response 的 status，则 koa 默认的 status 是 404 
        */
       if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404)
    } catch (e) {
      /*此处进行错误处理，下面会讲解具体实现*/
      let status = parseInt(e.status)

      const message = e.message
      if(status >= 400) {
        switch(status){
          case 400:
          case 404:
          case 500:
            fileName = status;
            break;
          // 其它错误 指定渲染 other 文件
          default:
            fileName = 'other'
        }
      } else{// 其它情况，统一返回为 500
        status = 500
        fileName = status
      }
      // 确定最终的 filePath 路径
      // const filePath = folder ? Path.join(folder, `${fileName}.html`) : templatePath
      ctx.body = `${status}-${message}`
    }
  }
}