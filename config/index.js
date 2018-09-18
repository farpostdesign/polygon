const path = require('path');

const config = {};

config.httpServerSocketPath = path.resolve('./tmp/sockets/polygon.sock');

module.exports = config;
