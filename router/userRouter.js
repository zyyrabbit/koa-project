
module.exports = function(app, router) {
  router.post('/user/create', app.controller.userController.create)
  router.get('/user/query', app.controller.userController.query)
  router.delete('/user/delete', app.controller.userController.delete)
  router.put('/user/update', app.controller.userController.update)
}