const yamljs = require('yamljs');
const doc = yamljs.load('./docs/openapi/openapi.yaml');

module.exports = doc;