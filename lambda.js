const awsServerlessExpress = require('aws-serverless-express');
const app = require('./bin/www');
const server = awsServerlessExpress.createServer(app)


module.exports.universal = (event, context) => awsServerlessExpress.proxy(server, event, context);
