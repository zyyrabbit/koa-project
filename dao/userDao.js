
const userModel = require('../model/userModel.js')
const Op = require('Sequelize').Op

class UserDao {
  
  static async create(userEntity) {
    await userModel.create(userEntity)
  }

  static async queryById(id) {
    return await userModel.findByPk(id)
  }

  static async queryByUserName(username) {
    return await userModel.findOne({
      where: {
        username: {
          [Op.like]: `%${username}%`
        }
      }
    })
  }

  static async query(queryDto) {
    return await userModel.findOne({
      where: {
        [Op.or]: [{
          id: queryDto.id,
          username: {
            [Op.like]: `%${queryDto.username}%`
          }
        }]
      }
    })
  }

  static async update(userDto) {
    return await userModel.update({
      username: userDto.username
    }, {
      where: {
        id: userDto.id
      }
    })
  }

  static async delete(query) {
    return await userModel.destroy({
      where: {
        id: query.id
      }
    })
  }
}

module.exports = UserDao