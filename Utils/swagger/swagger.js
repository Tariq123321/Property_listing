const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const env = require('dotenv').config();

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

// Update the server URL in the Swagger document with the port from environment variable
swaggerDocument.servers[0].url = `http://localhost:${process.env.APPPORT_ || 3000}/api/v1`;

module.exports = { swaggerUi, swaggerDocument };
