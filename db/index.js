const Sequelize = require('sequelize')

const uuid = require('node-uuid')

const config = require('./config')

console.log('init sequelize...')

function generateId() {
    return uuid.v1()
}

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

const ID_TYPE = Sequelize.INTEGER(10)

function defineModel(name, attributes) {
    const attrs = {}
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
   
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true,
    }
    
    return sequelize.define(name, attrs, {
      tableName: name,
      timestamps: false,
      hooks: {
        beforeValidate: function (obj) {
        }
      }
    })
}

const TYPES = [
    'STRING', 
    'INTEGER', 
    'BIGINT', 
    'TEXT', 
    'DOUBLE', 
    'DATEONLY', 
    'DATE',
    'BOOLEAN'
]

const exp = {
    defineModel: defineModel,
    sync: () => {
        if (process.env.NODE_ENV !== 'production') {
            sequelize.sync({ force: true })
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.')
        }
    }
};

for (let type of TYPES) {
    exp[type] = Sequelize[type]
}

exp.ID = ID_TYPE
exp.generateId = generateId

module.exports = exp