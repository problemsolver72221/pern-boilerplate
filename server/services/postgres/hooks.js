// const { SERVICE } = require('@marcopeg/hooks')
const { SERVICE } = require('@forrestjs/hooks')

exports.POSTGRES_BEFORE_INIT = `${SERVICE} postgres/beforeInit`
exports.POSTGRES_BEFORE_START = `${SERVICE} postgres/beforeStart`