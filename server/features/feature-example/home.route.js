const routeHome = ({ registerRoute }) =>
    registerRoute.get('/', (_, res) => res.send('Welcome!'))

module.exports = [ '$EXPRESS_ROUTE', routeHome ]
