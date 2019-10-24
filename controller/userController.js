class UserController {

  static async create(ctx, next) {
    const { app, response } = ctx
    response.body = await app.service.userService.create(ctx)
    await next()
  }

  static async query(ctx, next) {
    const { app, response } = ctx
    response.body = await app.service.userService.query(ctx)
    await next()
  }

  static async delete(ctx, next) {
    const { app, response } = ctx
    response.body = await app.service.userService.delete(ctx)
    await next()
  }

  static async update(ctx, next) {
    const { app, response } = ctx
    response.body = await app.service.userService.update(ctx)
    await next()
  }

}

module.exports = UserController