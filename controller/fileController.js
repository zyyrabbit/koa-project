class FileController {

  static async upload(ctx, next) {
    const { app } = ctx
    await app.service.fileService.upload(ctx)
    await next()
  }

}

module.exports = FileController