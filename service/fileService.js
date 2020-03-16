
const fs = require('fs')
const path = require('path')
const uploadPath = path.resolve(__dirname, '../static/upload')
/**
 * 文件上传攻略 
 * https://juejin.im/post/5da14778f265da5bb628e590
 */
class FileService {
  
  static async upload(ctx) {
    const { log, response, request, app } = ctx
    try {
      const file = request.files.file // file Form-data文件上传名称
      const readerStream = fs.createReadStream(file.path)
      const fileDesc = path.parse(file.name)
  
      const uploadFilePath = `${uploadPath}/${fileDesc.name}_${app.utils.genRandom()}${fileDesc.ext}`
      const writeStream = fs.createWriteStream(uploadFilePath);
      readerStream.pipe(writeStream)
      readerStream.on('end', () => {
        fs.unlink(file.path, () => {})
      }) 

      response.body = {
        fileUrl: uploadFilePath.replace(/\\/g, '/')
      }

      log.info(`上传文件成功`)
    } catch (e) {
      response.body = `上传文件失败 ${e.message}`
      log.error(`上传文件失败 ${e.message}`)
      return '上传文件失败'
    }
    return '上传文件成功'
  }

}

module.exports = FileService