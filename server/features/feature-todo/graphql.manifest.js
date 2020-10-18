const { GraphQLObjectType } = require('graphql')

module.exports = {
    /*
        EXPORT FEATURE GRAPHQL RESOLVERS & TYPES
    */

    types: {},
    resolvers: {},

    /*
        SETUP FEATURE ENDPOINTS
    */

    sessionQuery: {
        type: new GraphQLObjectType({
            name: 'SessionTodosQuery',
            fields: {
                getTodos: require('./queries/get-todos.query'),
            },
        }),
        resolve: async (_, args, { req, res }) => {
            // NOTE: apply auth logic here
            return {}
        },
    },

    sessionMutation: {
        type: new GraphQLObjectType({
            name: 'SessionTodosMutation',
            fields: {
                addTodo: require('./queries/add-todo.mutation'),
                updateTodo: require('./queries/update-todo.mutation'),
                deleteTodo: require('./queries/delete-todo.mutation'),
            },
        }),
        resolve: async (_, args, { req, res }) => {
            // NOTE: apply auth logic here
            return {}
        },
    },
}