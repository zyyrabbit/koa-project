
const fs = require('fs')
const path = require('path')
const uploadPath = path.join(process.cwd(), 'upload')

class FileService {
  
  static async upload(ctx) {
    const { log, response, request } = ctx
    try {
      const file = request.files.file
      const readerStream = fs.createReadStream(file.path)
      const ext = path.extname(file.name)
      const uploadFilename = `${uploadPath}/${Math.random().toString()}${ext}`
      const writeStream = fs.createWriteStream(uploadFilename);
      readerStream.pipe(writeStream)
      response.body = uploadFilename

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
