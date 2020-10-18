const { GraphQLList, GraphQLString } = require("graphql")

const welcomeQueryHandler = (_, args, { req }) => [
    `Welcome, ${args.name}!`,
    req.protocol + '://' + req.get('host') + req.originalUrl,
]

const welcomeQuery = ({ registerQuery }) =>
    registerQuery('welcome', {
        description: 'Welcome the user',
        args: {
            name: {
                type: GraphQLString,
                defaultValue: 'user',
            },
        },
        type: new GraphQLList(GraphQLString),
        resolve: welcomeQueryHandler,
    })

module.exports = [ '$EXPRESS_GRAPHQL', welcomeQuery ]

