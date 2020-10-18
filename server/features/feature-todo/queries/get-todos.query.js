const pg = require('@forrestjs/service-postgres')

// const {
//     GraphQLNonNull,
//     GraphQLID,
//     // GraphQLList,
//     GraphQLObjectType,
//     GraphQLString,
// } = require('graphql')
// import { GraphQLDate } from 'graphql-iso-date'
const { GraphQLJSON } = require('graphql-type-json')
// const { randomIdGenerator } = require('../../../lib/numbers')

// handler function
const handleGetTodos = async (args, { req, res }) => {
    const q = 'SELECT * FROM todo_table'

    // args: query, replacements (target variables)
    // console.log(req, 'test api')
    const response = await pg.query(q)
    console.log('res', response[0])
    return response[0]
}

// graphql type

// const todoType = new GraphQLObjectType({
//     name: 'Todo__type',
//     fields: {
//         todoId: { type: GraphQLID },
//         description: { type: GraphQLNonNull(GraphQLString)},
//     }
// })


module.exports = {
    description: 'Returns todos table',
    args: {},
    type: GraphQLJSON,
    // type: todoType,
    resolve: (_, args, { req, res }) => handleGetTodos(args, { req, res })
}
