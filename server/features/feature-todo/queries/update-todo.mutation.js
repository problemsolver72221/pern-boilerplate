const pg = require('@forrestjs/service-postgres')

const {
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
} = require('graphql')

const { GraphQLJSON } = require('graphql-type-json')

// handler function
const handleUpdateTodo = async args => {
    console.log(args, 'args')
    // const replacements = {
    //     description: args.description
    // }

    // const q = 'INSERT INTO todo_table(description) VALUES(:description)'

    const q = [
        `UPDATE todo_table`,
        `SET description = '${args.description}'`,
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
    description: 'Updates a single to-do',
    args: {
        todoId: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
    },
    type: GraphQLJSON,
    resolve: (_, args, { req, res }) => {
        console.log('hey', args)
        handleUpdateTodo(args, { req, res })
    }
}
