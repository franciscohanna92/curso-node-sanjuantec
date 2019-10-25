const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/openapi.yaml');

module.exports = swaggerDocument;