const pg = require('@forrestjs/service-postgres')

const {
    GraphQLNonNull,
    GraphQLString,
} = require('graphql')

const { GraphQLJSON } = require('graphql-type-json')

// handler function
const handleAddTodo = async args => {
    console.log(args, 'args')
    // const replacements = {
    //     description: args.description
    // }

    // const q = 'INSERT INTO todo_table(description) VALUES(:description)'
    const q = `INSERT INTO todo_table(description) VALUES('${args.description}')`

    console.log('query here', q)
    // args: db name, query, replacements (target variables)
    // const response = await pg.query(q, { replacements })
    try {
        console.log(pg.query)
        const response = await pg.query(q)
        console.log(response)
        return response[0]
    } catch (err) {
        console.log('err here', err)
    }
}

// graphql type

module.exports = {
    description: 'Adds a single to-do',
    args: {
        description: { type: new GraphQLNonNull(GraphQLString) },
    },
    type: GraphQLJSON,
    resolve: (_, args, { req, res }) => {
        console.log('hey', args.description)
        handleAddTodo(args, { req, res })
    }
}
