const yamljs = require('yamljs');
const doc = yamljs.load('./docs/openapi.yaml');

module.exports = doc;