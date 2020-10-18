/**
 * Dynamic Proxy
 * -------------
 *
 * Allows to define the backend port as environment variable and
 * make sure that the devServer uses it as a proxy for the api
 */

const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    const proxyPort = process.env.REACT_APP_PORT || process.env.PORT || '8080'
    // note: fix it in a better way
    // process.env.REACT_APP_PROXY || `http://localhost:${proxyPort}/`
    const proxyUrl =
        process.env.REACT_APP_PROXY || 'http://localhost:8080/api/graphql'
    app.use(proxy('/api', { target: proxyUrl }))
    app.use(proxy('/media', { target: proxyUrl }))
}
