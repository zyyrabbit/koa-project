class UserService {
  
  static async create(ctx) {
    const { app, log, request } = ctx
    try {
      await app.dao.userDao.create(request.body)
      log.info(`创建用户成功 ${request.body}`)
    } catch (e) {
      log.error(`创建用户失败 ${e.message}`)
      return '创建用户失败'
    }
    return '创建用户成功'
  }

  static async query(ctx) {
    const { app, log, query } = ctx
    try {
      let rst;
      if (query.id && query.username) {
        rst = await app.dao.userDao.query(query)
      } else if(query.id) {
        rst = await app.dao.userDao.queryById(query.id)
      } else {
        rst = await app.dao.userDao.queryByUserName(query.username)
      }
      ctx.send(rst)
      log.info(`查找用户成功 id: ${query.id}`)
    } catch (e) {
      log.error(`查找用户失败 ${e.message}`)
      return '查找用户失败'
    }
    return '查找用户成功'
  }


  static async update(ctx) {
    const { app, log, request } = ctx
    try {
      await app.dao.userDao.update(request.body)
      log.info(`更新用户成功 ${request.body}`)
    } catch (e) {
      log.error(`更新用户失败 ${e.message}`)
      return '更新用户失败'
    }
    return '更新用户成功'
  }

  static async delete(ctx) {
    const { app, log, query } = ctx
    try {
      await app.dao.userDao.delete(query)
      log.info(`删除用户成功 ${query}`)
    } catch (e) {
      log.error(`删除用户失败 ${e.message}`)
      return '删除用户失败'
    }
    return '删除用户成功'
  }
}

module.exports = UserService
