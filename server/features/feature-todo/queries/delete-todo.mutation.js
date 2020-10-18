const pg = require('@forrestjs/service-postgres')

const {
    GraphQLInt,
    GraphQLNonNull,
} = require('graphql')

const { GraphQLJSON } = require('graphql-type-json')

// handler function
const handleDeleteTodo = async args => {
    console.log(args, 'args')

    const q = [
        `DELETE FROM todo_table`,
        `WHERE todo_id = ${args.todoId}`,
    ].filter(i => i !== null).join(' ')

    console.log('query here', q)
    // args: db name, query, replacements (target variables)
    // const response = await pg.query(q, { replacements })
    try {
        const response = await pg.query(q)
        console.log(response)
        return response[0]
    } catch (err) {
        console.log('err here', err)
    }
}

// graphql type

module.exports = {
    description: 'Deletes a single to-do by id',
    args: {
        todoId: { type: new GraphQLNonNull(GraphQLInt) },
    },
    type: GraphQLJSON,
    resolve: (_, args, { req, res }) => {
        console.log('hey', args)
        handleDeleteTodo(args, { req, res })
    }
}
