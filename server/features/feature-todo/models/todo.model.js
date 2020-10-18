const Sequelize = require('sequelize')

const modelName = 'Todo'
const tableName = 'todo_table'

const fields = {
    todoId: {
        type: Sequelize.INTEGER,
        field: 'todo_id',
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}

const options = {
    tableName,
    freezeTableName: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
}

const init = (conn) => {
    const Model = conn.define(modelName, fields, options)
    return Model.sync()
}

// module.exports = { name: modelName, init }
module.exports = { name: modelName, init }