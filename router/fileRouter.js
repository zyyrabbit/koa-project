module.exports = function(app, router) {
  router.post('/upload', app.controller.fileController.upload)
}