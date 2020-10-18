// hooks
const { POSTGRES_BEFORE_START } = require('@forrestjs/service-postgres')
const { FEATURE_NAME } = require('./hooks')
const { sessionQuery, sessionMutation } = require('./graphql.manifest')

// postgres
const todoModel = require('./models/todo.model')

const register = ({ registerAction, registerHook }) => {
    registerHook(FEATURE_NAME)

    const defaults = {
        name: FEATURE_NAME,
        trace: __filename,
    }

    registerAction({
        ...defaults,
        hook: '$EXPRESS_GRAPHQL',
        handler: async ({ registerQuery, registerMutation }, ctx) => {
            registerQuery('todos', sessionQuery)
            registerMutation('todos', sessionMutation)
        },
    })

    registerAction({
        hook: `${POSTGRES_BEFORE_START}/default`,
        name: FEATURE_NAME,
        trace: __filename,
        handler: ({ options }) => {
            options.models.push(todoModel)
        },
    })
}

module.exports = register
