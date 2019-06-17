const config = require('./jest.config')
config.testRegex = '(integration.test|integration.spec)\\.(jsx?|tsx?)$' //Overriding testRegex option
console.log('RUNNING INTEGRATION TESTS')

module.exports = config
