const db = require('../db')

module.exports = db.defineModel('user', {
    username: db.STRING(255)
})