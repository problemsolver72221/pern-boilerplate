// WORKING LEGACY ONE
// ------------
/**
 * Production Run
 */

// if (process.env.NODE_ENV === 'production') {
//     // require('@babel/polyfill');
//     require('./build/src');
// /**
//  * Development Run
//  */
// } else {
//     // require('@babel/polyfill');
//     // require('@babel/register');
//     require('./index.js');
// }
//------------------


// import { createHookApp } from '@forrestjs/hooks'
const { runHookApp } = require('@forrestjs/hooks')

// Resolving Error: Cannot find module 'pg-native'
// Before Sequelize initialization in application we can remove stupid getter
// const pg = require('pg')
// delete pg.native
delete require('pg').native

require('es6-promise').polyfill()
require('isomorphic-fetch')

runHookApp({
    trace: true,
    services: [
        require('@forrestjs/service-env'),
        require('@forrestjs/service-express'),
        require('@forrestjs/service-express-graphql'),
        require('@forrestjs/service-logger'),
        require('@forrestjs/service-postgres'),
    ],
    features: [
        require('./features/feature-todo'),
    ],
    settings: async ({ setConfig, getEnv }) => {
        // setConfig('jwt', {
        //     secret: getEnv('JWT_SECRET'),
        //     duration: getEnv('JWT_DURATION'),
        // })
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
})

