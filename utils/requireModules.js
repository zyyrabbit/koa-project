const path = require('path')
const fs = require('fs')

module.exports = function (folder, exclude = []) {

  let content = {}
  
  fs.readdirSync(folder).forEach(filename => {
    //取出文件的后缀
    let extname = path.extname(filename)
    //只处理js文件
    if (extname === '.js') {
      //将文件名中去掉后缀
      let name = path.basename(filename, extname)
      if (!exclude.includes(name)) {
         //读取文件中的内容并赋值绑定
        content[name] = require(path.join(folder, filename))
      }
      
    }
  })

  return content
}