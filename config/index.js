const path = require('path');

const config = {};

config.dropzone = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: '/api/files'
};

config.httpServerSocketPath = path.resolve('./tmp/sockets/polygon.sock');

module.exports = config;
