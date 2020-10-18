// // Before Sequelize initialization in application we can remove stupid getter:
// const pg = require('pg')
// delete pg.native


const { runHookApp } = require('@forrestjs/hooks')

// Resolving Error: Cannot find module 'pg-native'
// Before Sequelize initialization in application we can remove stupid getter
// delete require('pg').native
const pg = require('pg')
delete pg.native

const serviceEnv = require('@forrestjs/service-env')
const serviceExpress = require('@forrestjs/service-express')
const serviceExpressGraphQL = require('@forrestjs/service-express-graphql')
const serviceLogger = require('@forrestjs/service-logger')
const servicePostgres = require('@forrestjs/service-postgres')


require('es6-promise').polyfill()
require('isomorphic-fetch')

runHookApp({
    trace: true,
    settings: async ({ setConfig, getEnv, getConfig }) => {
        setConfig('expressGraphql.mountPoint', getEnv('GRAPHQL_MOUNT_POINT'))
        setConfig('postgres.connections', [{
            connectionName: 'default',
            host: getEnv('PG_HOST'),
            port: getEnv('PG_PORT'),
            database: getEnv('PG_DATABASE'),
            username: getEnv('PG_USERNAME'),
            password: getEnv('PG_PASSWORD'),
            maxAttempts: Number(getEnv('PG_MAX_CONN_ATTEMPTS', 25)),
            attemptDelay: Number(getEnv('PG_CONN_ATTEMPTS_DELAY', 5000)),
            models: [
                require('./features/feature-todo/models/todo.model'),
            ],
        }])
    },
    services: [
        serviceEnv,
        serviceExpress,
        serviceExpressGraphQL,
        serviceLogger,
        servicePostgres,
    ],
    features: [
        require('./features/feature-todo'),
    ],
})
    .catch((err) => {
        console.log('*** BOOT: Fatal Error')
        console.log(err)
    })