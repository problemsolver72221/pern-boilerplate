/// WORKING LEGACY ONE - ROLL BACK HERE IF SOMETHING GOES WRONG --------

// /****
//     build app state
// */

const services = [
    require('@forrestjs/service-env'),
    require('@forrestjs/service-express'),
    require('@forrestjs/service-express-graphql'),
    require('@forrestjs/service-logger'),
    // require('./services/postgres'),
    require('@forrestjs/service-postgres'),
    // require('./services/express/graphql'),
    // require('./services/express'),
]

const features = [
    require('./features/feature-todo')
]

/****
    build app settings & variables
*/

//-- WORKING ONE:
const settings = async ({ setConfig, getEnv, getConfig }) => {
    setConfig('expressGraphql.mountPoint', getEnv('GRAPHQL_MOUNT_POINT'))
    // apply postgres databases to connect to
    // setConfig('postgres.connections', [])
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
            // require('./features/feature-todo/models/todo.model')
        ], // optional
    }])
    // console.log(getConfig('postgres.connections'), 'get config for postgres')
}

module.exports = {
    services,
    features,
    settings,
}
